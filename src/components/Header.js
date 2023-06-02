import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT } from '../redux/actions/action';
import { useNavigate, useParams } from 'react-router-dom'
import { ADD,REMOVE } from '../redux/actions/action'
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert";

const Header = () => {

    const [price,setPrice] = useState(0);
    // console.log(price);

    const [data,setData] = useState([]);

    const {id} = useParams();

    const history = useNavigate();

        const getdata = useSelector((state)=> state.cartreducer.carts);
        // console.log(getdata);

        const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dlt = (id)=>{
        dispatch(DLT(id))
    }

    const send = (e)=>{
        // console.log(e);
        dispatch(ADD(e));
      }


      const remove = (item)=>{
        dispatch(REMOVE(item))
      }

      const compare = ()=>{
        let comparedata = getdata.filter((e)=>{
          return e.id == id
        });
        setData(comparedata);
      }

      const showAlert = () =>{
        Swal({
            title: "Success",
            text: "Congratulations on buying your Favourite Game!!",
            icon: "success",
            confirmButtonText: "OK",
          });
      }



      useEffect(()=>{
        compare();
      },[id])
    

    const total = ()=>{
        let price = 0;
        getdata.map((ele,k)=>{
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    };

    useEffect(()=>{
        total();
    },[total])

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "50px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Games Shop</NavLink>
                    <Nav className="me-auto">
                        {/* <NavLink to="/" className="text-decoration-none text-light">Home</NavLink> */}
                    </Nav>

                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>


                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getdata.length ? 
                        <div className='card_details' style={{width:"24rem",padding:10}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Game</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((e)=>{
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                        <NavLink to={`/cart/${e.id}`}   onClick={handleClose}>
                                                        <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" />
                                                        </NavLink>   
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹{e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                                                <i className='fas fa-trash smalltrash'></i>
                                                            </p>
                                                            <button style={{fontSize:18,cursor:"pointer"}} onClick={e.qnty <=1 ? ()=>dlt(e.id) : ()=>remove(e)}>-</button>

                                                            <span  style={{fontSize:18,cursor:"pointer"}}>{e.qnty}</span>
                                                            
                                                            <button style={{fontSize:18,cursor:"pointer"}} onClick={()=>send(e)}>+</button>
                                                        </td>

                                                        <td className='mt-5'style={{color:"red",fontSize:20,cursor:"pointer"}}  onClick={()=>dlt(e.id)}>
                                                        <i className='fas fa-trash largetrash'></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total :₹ {price}</p>
                                    <button className="btn btn-primary btn-lg"  style={{textAlign:"center"}} onClick={showAlert}>Checkout</button>
                                </tbody>
                            </Table>
                        </div>:
                        
                   <div className='card_details d-flex justify-content-center align-items-center' style={{width:"24rem",padding:10,position:"relative"}}>
                    <i className='fas fa-close smallclose'
                    onClick={handleClose}
                     style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
                    <p style={{fontSize:22}}>Your cart is empty</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/102/102661.png" alt="" className='emptycart_img' style={{width:"5rem",padding:10}} />
                   </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header