
import './BasketView.css';
import "lightgallery.js/dist/css/lightgallery.css";
import React, { lazy, useState, useEffect } from "react";
import * as api from "../../lenaHelpers/APIRequests.js";
import * as storage from '../../lenaHelpers/LocalStorage.js';
import { useNavigate } from "react-router-dom";
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
import { useMediaQuery } from 'react-responsive';
import { getCSSQuery } from '../../lenaHelpers/Helpers';


const Modal = lazy(() =>
  import("../Modal/Modal")
);

const NewProductCard = lazy(() =>
  import("../NewProductCard/NewProductCard")
);





export default function ProductsView(props) {

        const isMD = getCSSQuery(useMediaQuery, 'md');
        

        const navigate = useNavigate();
        const stateActions = [[
          {
            name: 'Sim',
            callback: ()=>{
              props.setIsLoading(true);
              api.newSale(name, phoneNumber, address, products.map((product)=> {
                return({
                  id: product.id, 
                  category: product.category
                });
              }), true).then((data)=>{
                console.log(data);
                if(data.success){
                  storage.cleanBasket();
                  storage.insertPlacedOrderData(data.id, data.total);
                  navigate('/PlacedOrder');
                }

                props.setIsLoading(false);
              }).catch((err)=>{
                console.log(err);
                props.setIsLoading(false);
              });
            }
          },
          {
            name: 'Não',
            callback: ()=>{
              setWarningData({
                ...warningData,
                isVisible: false
              });
            }
          },
        ],[
          {
            name: 'Ok',
            callback: ()=>{
              setWarningData({
                ...warningData,
                isVisible: false
              });
            }
          },
        ],];

        const [photos, setPhotos] = useState({});

        const [view,] = useState('list');
        const [name, setName] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [address, setAddress] = useState('');
        const [totalPrice, setTotalPrice] = useState(0);
        const [products, setProducts] = useState([]);
        const [warningData, setWarningData] = useState({
          title: 'Aviso',
          message: 'Team a certeza que quer avançar com a compra?',
          actions: stateActions[0],
          isWarning: false,
          isVisible: false
        });


      useEffect(() => {
        updateProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const updateProducts = () =>{
        props.setIsLoading(true);

        const productsToBasket = storage.getBasket();
        setProducts(productsToBasket);
        api.newSale('*', '*', '*', productsToBasket.map((product)=> {
          return({
            id: product.id, 
            category: product.category
          });
        }), false).then((data)=>{
          if(data && data.total > -1){
            console.log(data);
            setTotalPrice(data.total);
          }

          if(data && data.productsToRemove && data.productsToRemove.length){
            data.productsToRemove.forEach(product => {
              storage.removeProductFromBasket(product);
            });

            const newBasket = storage.getBasket();
            setProducts(newBasket);
          }
          props.setIsLoading(false);
        }).catch((err)=>{
          console.log(err);
          props.setIsLoading(false);
        });
      }
    
      
      const makePurchase = ()=>{
        const hasName = name.replaceAll(' ', '') !== '' && name.replaceAll(' ', '').length > 10; 
        const hasPhone = phoneNumber.replaceAll(' ', '') !== '' && phoneNumber.replaceAll(' ', '').length === 9; 
        const hasAddress = address.replaceAll(' ', '') !== '' && address.replaceAll(' ', '').length > 10; 

        if(!hasAddress || !hasName || !hasPhone){
          setWarningData({
            ...warningData,
            message:  <> Faltam preencher: <br/>
                        {!hasName ? <> Nome com mais de 10 letras<br/></> : ''} 
                        {!hasPhone ? <> Número de telefone com 9 digitos<br/></> : ''} 
                        {!hasAddress ? <>Morada com mais de 10 letras</>: ''} 
                      </>,
            isVisible: true,
            isWarning: true,
            actions: stateActions[1]
          });
        }else{
          setWarningData({
            ...warningData,
            message: 'Tem a certeza que quer avançar com o pedido?',
            isVisible: true,
            isWarning: false,
            actions: stateActions[0]
          });
        }
      }

      const Linker = (props) =>{
        const navigate = useNavigate();
        return(  <button
          type="button"
          className="btn btn-sm btn-primary base-button-color"
          title="navigate"
          onClick={()=>{navigate(props.route)}}
        >
        {props.text}
        </button>);
      }

      const toRemove = (product) =>{
        storage.removeProductFromBasket(product);
        updateProducts();
      }
      
      /* 
      <div className="row">
              <div className="col-md-9">
                <span className="display-5 px-3 bg-white rounded shadow basket-total top-basket-total">
                  total 
                  <br />
                  {totalPrice ?? 0} €
                </span>
              </div> 
            </div>

            normal
            <div className="col-md-3">
                <span className="display-5 px-3 bg-white rounded shadow basket-total side-basket-total">
                  total
                  <br />
                  {totalPrice ?? 0} €
                </span>
              </div>

      */

    return (
        <React.Fragment>
        <LightgalleryProvider>
          <div
            className="p-5 bg-primary bs-cover"
            style={{
              backgroundImage: "url(../../images/LenaTestProducts/banner.png)",
            }}
          >
            <div className="container text-center header-bv">
              
              {isMD ? 
                  <></> :
                  <Linker text={'Acompanhar Encomenda'} route={'/FollowPurchase'}></Linker>}
              <span className="display-5 px-3 bg-white rounded shadow">
                Carrinho
              </span>
              <div className={"actions-md-bv"}>
                {isMD ? 
                  <Linker text={'Acompanhar Encomenda'} route={'/FollowPurchase'}></Linker>
                  : <></>}
                <Linker text={'Productos'} route={'/Products'}></Linker>
              </div>
            </div>
          </div>
         
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-md-6">
              <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control adress-basket"
                  placeholder="Nome completo"
                  required
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              <input
                  id="phone"
                  name="phone"
                  type='number'
                  className="form-control adress-basket"
                  placeholder="Número de telefone associado ao MBWay"
                  required
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                />
              <input
                  id="adress"
                  name="adress"
                  type="text"
                  className="form-control adress-basket"
                  placeholder="Morada"
                  required
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                />
              </div>
              <div className="col-md-6 purchase-actions-bv">
                <span className="display-5 px-3 bg-white rounded shadow basket-total-bv">
                  total
                  <br />
                  {totalPrice ?? 0} €
                </span>
                <button
                  type="button"
                  className="btn btn-lg btn-primary mr-2 col-sm basket-button-bv"
                  title="Products"
                  onClick={makePurchase}
                  >
                    Fazer Pedido 
                </button>
              </div>
            </div>
            <div className="row row-space-bv">
              <div className="col-md-6">
                <hr />
                <div className="row g-3 basket-overload-bv">
                  {view === "list" &&
                    products.map((product, idx) => {
                      return (
                        <div key={idx} className="col-md-12 row-bv">
                          <NewProductCard 
                            data={product} 
                            showPrice={true}
                            isToRemove={true}
                            toRemove={toRemove}
                            photos={photos}
                            setPhotos={setPhotos}/>
                        </div>
                      );
                    })}
                </div>
                <hr />
              </div>
            </div> 
          </div>
          <Modal {...warningData}/>
          <div hidden={true}>
              {Object.keys(photos).map((photoCollection, index)=>{
                  return photos[photoCollection].map((item, innerIndex)=>{
                    return(
                    <LightgalleryItem key={index} group={photoCollection} src={item}>
                      <img src={item} style={{ width: "100%" }} alt={""}/>
                    </LightgalleryItem>
                    );
                  })
                })
              }
          </div>
        </LightgalleryProvider>
        </React.Fragment>
    )
}
