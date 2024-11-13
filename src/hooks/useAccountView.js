import { useState } from "react";
import request from "../Request";
import { toast } from "react-toastify";

export const useAccountView = () => {
  const initialValue = {
    date: "",
    narration: "",
    rp: "",
    transactionMode: "",
    amount: "",
    accountHead: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [accountViewData, setAccountViewData] = useState([]);
  const [accountViewTotal, setAccountViewTotal] = useState(0);

  const handleAllAccountView = async (paramItems) => {
    try {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(paramItems)) {
        if (value) {
          params.append(key, value);
        }
      }
      const response = await request.get(
        `getAllAccountView?${params.toString()}`
      );
      setAccountViewData(response.data.data);
      setAccountViewTotal(response.data.total);
    } catch (error) {
      console.log("error at fetching account view", error);
    }
  };

  const handleAccountHeadSelect = (accountHeadValue) => {
    setFormData({
      ...formData,
      accountHead: accountHeadValue,
    });
    if (errors["accountHead"]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["accountHead"]: undefined,
      }));
    }
  };

  const handleSubmitPost = async () => {
    const error = validateErrors();

    // console.log(error,'err')
    if (Object.keys(error).length === 0) {
      try {
        const response = await request.post("addAccountView", formData);
        if (response.status === 201) {
          setFormData(initialValue);
        }
        return response.status;
      } catch (error) {
        console.log("error at posting acount view", error);
        toast.error(error?.response?.data.message)
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
    console.log("name", name);
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validateErrors = () => {
    let error = {};
    if (!formData.date) {
      error.date = "please select any date to continue";
    }
    if (!formData.narration) {
      error.narration = "please enter any narration";
    }
    if (!formData.rp) {
      error.rp = "please select any one option";
    }
    if (!formData.transactionMode) {
      error.transactionMode = "please select any one option";
    }
    if (!formData.accountHead) {
      error.accountHead = "please select any account head";
    }
    if (!formData.amount) {
      error.amount = "please enter the amount";
    }
    setErrors(error);
    return error
  };

  const handleGetAccountViewById = async(id)=>{
    try {
        const response = await request.get(`getAccountViewById/${id}`)
        if(response.data.data){
            setFormData({
                date: new Date(response.data.data.date).toISOString().split("T")[0] || "",
                narration: response.data.data.narration || "",
                rp: response.data.data.rp || "",
                transactionMode: response.data.data.transactionMode || "",
                amount: response.data.data.amount || "",
                accountHead: response.data.data.accountHead || "",
            });
        }
    } catch (error) {
        console.log("error at fetching single data", error.message)
        toast.error(error?.message)
    }
  }

  const handleUpdate = async(id)=>{
    const error = validateErrors();
    if (Object.keys(error).length === 0) {
      try {
        const response = await request.put(`updateAccountView/${id}`, formData);
        if (response.status === 200) {
          setFormData(initialValue);
        }
        return response.status;
      } catch (error) {
        console.log("error at posting acount view", error);
        toast.error(error?.message)
      }
    }   
  }

  return {
    accountViewData,
    accountViewTotal,
    handleAllAccountView,
    formData,
    handleSubmitPost,
    handleChange,
    errors,
    handleAccountHeadSelect,
    handleGetAccountViewById,
    handleUpdate,
    initialValue,
    setFormData
  };
};
/**
 * useAccountView Hook
 * 
 * This custom React hook manages the state and operations related to account views.
 * It provides functionalities for fetching, submitting, updating, and validating account view data.
 *
 * Usage:
 * 
 * import { useAccountView } from 'path/to/useAccountView';
 *
 * const Component = () => {
 *   const {
 *     accountViewData,
 *     accountViewTotal,
 *     handleAllAccountView,
 *     formData,
 *     handleSubmitPost,
 *     handleChange,
 *     errors,
 *     handleAccountHeadSelect,
 *     handleGetAccountViewById,
 *     handleUpdate,
 *   } = useAccountView();
 *
 *   // Example to fetch account views
 *   const fetchAccountViews = () => {
 *     const params = { date: '2024-01-01', rp: 'someValue' };
 *     handleAllAccountView(params);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={fetchAccountViews}>Fetch Account Views</button>
 *       <ul>
 *         {accountViewData.map(account => (
 *           <li key={account.id}>{account.narration}</li>
 *         ))}
 *       </ul>
 *       <div>Total Account Views: {accountViewTotal}</div>
    '*/