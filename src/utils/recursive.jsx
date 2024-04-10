const forFindChild = (data) => {
    var allProducts = []
    function findLittleChild (index_data) {
        //first if is used when the depth level is upper than 2 because recursive fnction return an array and not an object like index_data property transmits
        if(Array.isArray(index_data) && index_data.length > 0) { //if it's not an array, we are at the deepest level
            for(const child of index_data){
                if(child.products.length === 0){ 
                    if(Array.isArray(index_data.childs)){
                        //products are at the deepest level, so if no products, the depth may continue
                        //maybe no product in this category, so check if it's the lastest child
                        findLittleChild(child.childs) 
                    }
                } else {
                    //if it's last child, we get all of their products
                    for(const product of child.products){
                        allProducts.push(product)
                    }
                }
            }
        //idem when we are lower thant 2 levels
        } else if(Array.isArray(index_data.childs) && index_data.childs.length > 0) {
            // console.log('21', index_data.slug);
            for(const child of index_data.childs){
                if(child.products.length === 0){
                    if(Array.isArray(index_data.childs)){
                        
                        findLittleChild(child.childs)
                    }
                } else {
                    // console.log('22', child.slug);
                    for(const product of child.products){
                        allProducts.push(product)
                    }
                }
            }
        //if the data is not an array or empty, we are at the deepest level, so we get their products
        } else {
            if(index_data.length === 0) return
            for(const product of index_data.products){
                allProducts.push(product)
            }
            console.log('deepest level');
        }
        return
    }
    findLittleChild(data)
    return allProducts.flat()
}

export default forFindChild