import numpy as np
import tensorflow_hub as hub
from google.cloud import storage
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.imagenet_utils import preprocess_input

app = Flask(__name__)

# Load the trained models
MODEL_PATHS = {
    "mango": {
        "path": "mango.h5",
        "label_map": {
            0: "Mango_anthracnose_disease",
            1: "Mango_bacterial_canker_disease",
            2: "Mango_cutting_weevil_disease",
            3: "Mango_dieback_disease",
            4: "Mango_gall_midge_disease",
            5: "Mango_healthy",
            6: "Mango_powdery_mildew_disease",
            7: "Mango_sooty_mold_disease",
        },
        "input_shape" : (224, 224, 3)
    },
    "chili": {
        "path": "chili.h5",
        "label_map": {
            0: "chili_healthy",
            1: "chili_leaf_curl",
            2: "chili_leaf_spot",
            3: "chili_whitefly",
            4: "chili_yellowish"
        },
        "input_shape" : (220, 220, 3)
    },
    "cassava": {
        "path": "cassava.h5",
        "label_map": {
            0: "cassava_bacterial_blight",
            1: "cassava_brown_streak_disease",
            2: "cassava_green_mottle",
            3: "cassava_mosaic_disease",
            4: "cassava_healthy"
        },
        "input_shape" : (224, 224, 3)
    },
    "guava": {
        "path": "guavas.h5",
        "label_map": {
            0: "guava_canker",
            1: "guava_dot",
            2: "guava_healthy",
            3: "guava_mummification",
            4: "guava_rust"
        },
        "input_shape" : (224, 224, 3)
    },
    "potato": {
        "path": "potato.h5",
        "label_map": {
            0: "potato_early_blight",
            1: "potato_late_blight",
            2: "potato_healthy",
        },
        "input_shape" : (256, 256, 3)
    },
    "tomato": {
        "path": "tomato.h5",
        "label_map": {
            0: "Tomato_bacterial_spot",
            1: "Tomato_early_blight",
            3: "Tomato_late_blight",
            4: "Tomato_leaf_mold",
            5: "Tomato_septoria_leaf",
            6: "Tomato_spider_mites",
            7: "Tomato_target_spot",
            8: "Tomato_mosaic_virus",
            9: "Tomato_healthy",
        },
        "input_shape" : (112, 112, 3)
    },
    "tea": {
        "path": "tea.h5",
        "label_map": {
            0: "Tea_algal_leaf",
            1: "Tea_anthracnose",
            2: "Tea_bird_eye_spot",
            3: "Tea_brown_blight",
            4: "Tea_healthy",
            5: "Tea_red_leaf_spot"
        },
        "input_shape" : (250, 250, 3)
    },
    "corn": {
        "path": "corn.h5",
        "label_map": {
            0: "corn_northern_leaf_blight",
            1: "corn_common_rust",
            2: "corn_gray_leaf_spot",
            3: "corn_healthy",
        },
        "input_shape" : (224, 224, 3)
    },
    "rice": {
        "path": "rice.h5",
        "label_map": {
            0: "rice_healthy",
            1: "rice_brown_spot",
            2: "rice_hispa",
            3: "rice_leaf_blast",
            4: "rice_neck_blast",
        },
        "input_shape" : (224, 224, 3)
    },
}

BUCKET_NAME = "tamara-bucket"

def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

def model_predict(img_path, model, label_map, input_shape):
    img = image.load_img(img_path, target_size=input_shape[:2])
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)
    label_index = np.argmax(preds)
    label = label_map[label_index]
    confidence = preds[0, label_index] * 100

    return label, confidence

@app.route('/predict/<model_name>', methods=['POST'])
def predict(model_name):
    # Check if an image file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'})

    file = request.files['file']

    # Check if the file is a valid image
    if file.filename == '':
        return jsonify({'error': 'No image file selected'})

    if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        return jsonify({'error': 'Invalid image file'})

    # Save the file
    file_path = secure_filename(file.filename)
    file.save(file_path)

    # Load the models
    model_info = MODEL_PATHS.get(model_name)
    if model_info is None:
        return jsonify({'error': 'Invalid model specified'})
    
    download_blob(
        BUCKET_NAME,
        "models/" + model_info["path"],
        "/tmp/" + model_info["path"],
    )
    model = load_model("/tmp/" + model_info["path"], custom_objects={'KerasLayer':hub.KerasLayer})
    model.make_predict_function()

    label_map = model_info["label_map"]
    input_shape = model_info["input_shape"]

    # Make predictions with the model
    preds, confidence = model_predict(file_path, model, label_map, input_shape)

    # Determine if the image is unclear
    unclear_threshold = 40
    is_unclear = bool(confidence < unclear_threshold)  # Convert to regular boolean type

    # Prepare the result
    result = {
        'label': preds,
        'confidence': confidence,
        'is_unclear': is_unclear,
        'label_map': label_map
    }

    # Return the result as JSON
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
