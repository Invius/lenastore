import './NewProductCard.css';
import React, {useEffect, useState} from 'react';
import * as api from "../../lenaHelpers/APIRequests.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineZoomIn, MdRemoveShoppingCart } from 'react-icons/md';
import {
    useLightgallery,
  } from "react-lightgallery"

export default function NewProductCard(props) {
    const product = props.data;
    const [img64, setImg64] = useState('');

    const { openGallery } = useLightgallery();

  useEffect(()=>{
    if(product &&  product.id && product.category){
        const callback = (data) => {
            if(data && data.img64){
                setImg64(data.img64);
            }
        }
        console.log(props.isTest);
        if(props.isTest){
            api.testPhoto().then(callback);
        }else{
            api.photo(product.id, product.category).then(callback);
        }
    }
  }, [product]);

  useEffect(()=>{
    if(img64 && !props.photos[product.id]){
        props.setPhotos({...props.photos, [product.id]: [`data:image/jpeg;base64,${img64}`]});
    }
  }, [img64]);

  return (
    <>
        <div className={'card-npc'}>
            <div className={'container-npc'}>
                <div className="container-img-npc" onClick={()=>{
                                                    img64 && openGallery(product.id)}}>
                <img src={`data:image/jpeg;base64,${img64}`} className="img-fluid img-npc" alt="..." />
                <div className="zoom-container-npc">
                    <MdOutlineZoomIn className="zoom-npc"/>
                </div>
                </div>
                <div className={'description-name-npc item-npc'}>
                    <h4>{ product ? product.name : '' }</h4>
                    <p>{ product ? product.description : '' }</p> 
                </div>
                {props.showPrice ? (
                    <div className={'buy-npc'}>
                        <p>{(product ? product.price : 0) + '€'}</p>
                        {props.isToBuy ? (
                            <button
                                type="button"
                                className="btn btn-sm btn-primary product-view-buy-button-npc item-npc"
                                title="Add to cart"
                                onClick={()=>props.toBasket ? props.toBasket(product) : ()=>{}}
                                >
                                <FontAwesomeIcon icon={faCartPlus} />
                            </button>
                        ): (
                            props.isToRemove ? (
                                <button
                                type="button"
                                className="btn btn-sm btn-primary product-view-buy-button-npc item-npc"
                                title="Add to cart"
                                onClick={()=>props.toRemove ? props.toRemove(product) : ()=>{}}
                                >
                                <MdRemoveShoppingCart />
                            </button>
                            ) : (<></>)
                        )}
                    </div>
                ) : (
                    <div className="empty-npc">
                    </div>
                )}
            </div>
        </div>
        
    </>
  )
}