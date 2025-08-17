import { create } from "zustand";
import axios, { formToJSON } from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://ecommerce-store-backend-eo85.onrender.com";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    currentProduct:null,

    formData:{
        name:"",
        price:"",
        image:""
    },
    setFormData:(formData)=>set({formData}),

    resetFormData:()=>set({formData:{name:"",image:"",price:""}}),
    addProduct:async(e)=>{
        e.preventDefault();
        set({loading:true});
        try {
            const {formData}=get();
            await axios.post(`${BASE_URL}/api/product/create`,formData);
            await get().fetchProducts();
            get().resetFormData();
            toast.success("Product added successfully");
        } catch (error) {
            console.log("Error in the addProduct function",error);
            toast.error("Product not added");
        }
        finally{
            set({loading:false});
        }
    },

    fetchProducts: async () => {
        set({loading:true});
        try {
            const response=await axios.get(`${BASE_URL}/api/product/all`);
            set({products:response.data.data,error:null})
        } catch (error) {
            if(error.status==429) set({error:"Rate limiting reached",products:[]});
            else{
                set({error:"something went wrong",products:[]});
            }
        }
        finally{
            set({loading:false})
        }
    },
    deleteProduct:async(id)=>{
        set({loading:true})
        try {
            await axios.delete(`${BASE_URL}/api/product/${id}`);
            set(prev=>({products:prev.products.filter(product=>product.id!==id)}));
            toast.success("Product Deleted")
        } catch (error) {
            console.log("Error in delete product function",error);
            toast.error("Something Went Wrong");
        }
        finally{
            set({loading:false})
        }
    },
    fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/product/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/product/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },


}))
