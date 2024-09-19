import { useState, useEffect, useReducer } from "react";

import { dataBase, storage } from "../firebase/Config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

const estadoInicial = {
    loading: null,
    error: null,
}

const inserirReducer = (state, action) => {
    
}

export const useInserirProdutos = (docCollection) => {
    const [response, dispatch] = useReducer(inserirReducer, estadoInicial)
    const [cancelado, setCancelado] = useState(false)
}