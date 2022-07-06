


const ImageUpload = ({ image, showImageInput, site }) => {

    return (

        <div className={site ? "site-image-container" : "material-image-container"}>
            {image && <img
                className={site ? 'site-form-image' : "material-form-image"}
                src={URL.createObjectURL(image)}
            >
            </img>
            }
            {!image && <>
                <i className="fa-duotone fa-cloud-arrow-up" onClick={showImageInput}></i><p className="valid-uploads">Please upload a pdf, png, jpg, jpeg, or gif image</p>
            </>}
        </div>
    )
}

export default ImageUpload