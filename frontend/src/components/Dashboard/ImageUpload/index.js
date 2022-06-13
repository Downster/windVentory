


const ImageUpload = ({ image, showImageInput }) => {

    return (

        <div className="material-image-container">
            {image && <img
                className="material-form-image"
                src={URL.createObjectURL(image)}
            >
            </img>
            }
            {!image && <>
                <i className="fa-duotone fa-cloud-arrow-up" onClick={showImageInput}></i><p className="valid-uploads">Please upload a pdf, png, jpg, jpeg, or gif</p>
            </>}
        </div>
    )
}

export default ImageUpload