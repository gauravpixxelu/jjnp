import API from "../../api";

export const getProductBySlug = async (body) => {
    const response = await API.post('products/getproducts',body,'')
        .then((data) => {
            return data;
        }).catch((err) => {
            return err;
        })

        return response;
}