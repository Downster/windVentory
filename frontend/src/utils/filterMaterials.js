const filterMaterials = (type, materials) => {
    if (type === 'material') {
        return materials.filter((material) => {
            return material.class_id === 1 || material.class_id === 2 || material.class_id === 3 || material.class_id === 4
        })
    } else if (type === 'chemical') {
        return materials.filter((material) => {
            return material.class_id === 5 || material.class_id === 6 || material.class_id === 7
        })
    }

}

export default filterMaterials