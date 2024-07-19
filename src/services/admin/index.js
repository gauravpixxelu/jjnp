import API from "../../api";

export const updateDeliverType = async (body) => {
    const response = await API.post('admin/ordersAdmin/updateorders',body,'')
        .then((data) => {
            return data;
        }).catch((err) => {
            return err;
        })

        return response;
}