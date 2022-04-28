import React, { Component } from 'react'
import './CategoryProducts.css'
import image_upload_icon_svg from '../assets/arrow-up-from-bracket-solid.svg'
import blank_image from '../assets/blank_image.svg'
import axios from 'axios'
import Toast from '../../Toast/Toast'
import robot from './assets/robot.svg'
export default class CategoryProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      screenCount : 0,
      items: [],
      search_product_name: "",
      "add-product-id":0,
      "add-details-category-id": 0,
      "selected_category_name": "category name should come here",
      // "details-added-count": 0,



      //Screen 1      
      "add-product-name": "",
      "tracking_image_upload_icon_svg": undefined,
      "product_tracking_image": undefined,


      // Screen 2
      "add-product-text-description": "Your Product Description.",

      // Screen 3
      "product_image_upload_icon_svg": undefined,
      "product_image": undefined,

      //Screen 4
      "add-product-video":undefined,
      "product-video-file-url": undefined,

      //Screen 5
      "add-product-audio":undefined,
      "product-audio-file-url": undefined,

      //Screen 6
      "add-product-minimum-quantity": 0,
      "add-product-maximum-quantity": 0,
      "add-product-price": 0,
    }

  }
  componentDidMount() {
    this.setState({
      selected_category_name: this.props.selected_category_name,
    })
    this.get_updated_list_of_items_from_server();
    // document.getElementById("target-image-preview").style.backgroundSize = "30px 30px"
    // document.getElementById("product-image-preview").style.backgroundSize = "30px 30px"
  }
  upload_input_image(event, id) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    var thisRef = this;
    reader.onloadend = function (e) {
      if (id == "tracking-image-preview") {
        thisRef.setState({
          tracking_image_upload_icon_svg: [reader.result],
          product_tracking_image: file
        }, function () {
          this.setStateForNext();
        })
      } else if (id == "product-image-preview") {
        thisRef.setState({
          product_image_upload_icon_svg: [reader.result],
          product_image: file,
        },function(){
          this.setStateForNext();
        })
      }
    }.bind(this);
    document.getElementById(id).style.backgroundSize = "100% 100%"
  }
  get_product_video(event) {
    var video = event.target.files[0]
    var fileUrl = window.URL.createObjectURL(video);
    this.setState({
      "product-video-file-url": fileUrl,
      "add-product-video": video
    })
    var docs = document.querySelectorAll("#video_here");
    // document.getElementById("video_here")
    docs[0].setAttribute("src", fileUrl);
    docs[1].setAttribute("src", fileUrl);
    docs[0].load();
    docs[1].load();
  }
  get_product_audio(event) {
    var audio = event.target.files[0]
    var fileUrl = window.URL.createObjectURL(audio);
    this.setState({
      "product-audio-file-url": fileUrl,
      "add-product-audio": audio,
    })
    var docs = document.querySelectorAll("#audio");
    docs[0].setAttribute("src", fileUrl);
    docs[1].setAttribute("src", fileUrl);
    docs[0].load();
    docs[1].load();
  }

  // removeVideo() {
  //   document.getElementById("video_here").setAttribute("src", "");
  // }
  // removeAudio() {
  //   document.getElementById("audio").setAttribute("src", "");
  // }
  post_data_to_server(postOredit) {
    var thisRef = this;
    var category_name = this.state["selected_category_name"]
    var product_name = this.state["add-product-name"]
    var product_description = this.state["add-product-text-description"]
    var tracking_image = this.state["product_tracking_image"]
    var product_image = this.state["product_image"]
    var product_video = this.state["add-product-video"]
    var product_audio = this.state["add-product-audio"]

    // var product_minimum_quantity = this.state["add-product-minimum-quantity"]
    // var product_maximum_quantity = this.state["add-product-maximum-quantity"]
    // var product_price = this.state["add-product-price"]


    // create formData object
    const formData = new FormData();
    formData.append("ProductName", product_name)
    formData.append("Desc", product_description)
    formData.append("Category", category_name)
    formData.append("TargetImage", tracking_image)
    formData.append("PromoImage", product_image)
    formData.append("Video", product_video)
    formData.append("Audio", product_audio)

    console.log("ProductName", product_name)
    console.log("Desc", product_description)
    console.log("Category", category_name)
    console.log("TargetImage", tracking_image)
    console.log("PromoImage", product_image)
    console.log("Video", product_video)
    console.log("Audio", product_audio)
    if(postOredit == "edit"){
      var url = process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL + "/api/uploaddata/editItem?id=" + this.state["add-product-id"]
      var method= "PUT"
    }else{
      var  url = process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL + "/api/uploaddata/data"
      var method = "POST"
    }
    axios({
      method:method,
      url:url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(resp => {
      if (resp.status == 200) {
        thisRef.get_updated_list_of_items_from_server();
      }
    })
  }

  async get_updated_list_of_items_from_server() {
    var thisRef = this;
    var url = process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL+"/api/uploaddata/getData"
    await axios.get(url)
      .then(resp => {
        thisRef.setState({
          items: resp.data["Result"]
        })
      });
  }
  remove_previous_details() {
    this.setState({
      "details-added-count": 0,
      "add-product-id":0,
      //Screen 1      
      "add-product-name": "",
      "tracking_image_upload_icon_svg": undefined,
      "product_tracking_image": undefined,


      // Screen 2
      "add-product-text-description": "Your Product Description.",

      // Screen 3
      "product_image_upload_icon_svg": undefined,
      "product_image": undefined,

      //Screen 4
      "add-product-video": undefined,
      "product-video-file-url": undefined,

      //Screen 5
      "product-audio-file-url": undefined,

      //Screen 6
      "add-product-minimum-quantity": 0,
      "add-product-maximum-quantity": 0,
      "add-product-price": 0,

    })
  }
  
  deleteProduct(item, index) {
    var id = item.Id
    var category = item.Category
    var thisRef = this
    var url = process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL +"/api/uploaddata/deleteBlob?id=" + id + "&category=" + category;
    axios.delete(url).then(resp => {
      if (resp.status == 200) {
        thisRef.get_updated_list_of_items_from_server();
      }
    })
  }
  editItem(item, index) {
    var id = item.Id
    var category = item.Category
    var getUrl = process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL+"/api/uploaddata/getItem?id=" + id + "&category=" + category
    axios.get(getUrl).then(resp => {
      console.log(resp.data);
      this.setState({
        "add-product-name": resp.data.productName,
        "selected_category_name": resp.data.category,
        "add-product-text-description": resp.data.description,
        "tracking_image_upload_icon_svg": resp.data.targetImage,
        "tracking_image": resp.data.targetImage,
        "product_image": resp.data.promoImage,
        "product_image_upload_icon_svg": resp.data.promoImage,
        "product_video": resp.data.video,
        "product-video-file-url":resp.data.video,
        "product_audio": resp.data.audio,
        "product-audio-file-url":resp.data.audio,
        "add-product-minimum-quantity": resp.data.minimumQty,
        "add-product-maximum-quantity": resp.data.maximumQty,
        "add-product-price":resp.data.price ,
        "add-product-id":resp.data.id,
      })
    })
  }
  publishProduct(item){
    var thisRef=this;
    axios({
      method: 'PUT',
      url: process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL + '/api/uploaddata/publish?id=' + item.Id + "&category="+item.Category,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp.status == 200) {
        thisRef.get_updated_list_of_items_from_server();
      }
    });
  }
  setStateForNext(){
    if(this.state.screenCount == 0){
      if(this.state["add-product-name"]!=""){
        document.getElementById("nextButton").disabled = false;
      }else{
        document.getElementById("nextButton").disabled = true;
      }
    }
    if (this.state.screenCount == 1) {
      if (this.state["product_tracking_image"] != undefined) {
        document.getElementById("nextButton").disabled = false;
      } else {
        document.getElementById("nextButton").disabled = true;
      }
    }
    if(this.state.screenCount == 6){
    var category_name = this.state["selected_category_name"]
    var product_name = this.state["add-product-name"]
    var product_description = this.state["add-product-text-description"]
    var target_image = this.state["product_target_image"]
    var product_image = this.state["product_image"]
    var product_video = this.state["add-product-video"]
    var product_audio = this.state["add-product-audio"]
    var product_minimum_quantity = this.state["add-product-minimum-quantity"]
    var product_maximum_quantity = this.state["add-product-maximum-quantity"]
    var product_price = this.state["add-product-price"]
    var count = 0
    console.log(category_name, product_name, product_description, target_image, product_image, product_video, product_audio)
    if (product_description != "Your Product Description." && product_description != "") {
      count += 1
    }
    if (product_image != undefined) {
      count += 1
    }
    if (product_video != undefined) {
      count += 1
    }
    if (product_audio != undefined) {
      count += 1
    }
    if (product_minimum_quantity != 0) {
      count += 1
    }
    if (product_maximum_quantity != 0) {
      count += 1
    }
    if (product_price != 0) {
      count += 1
    }
      if (count >= 2) {
        document.getElementById("submitButton").disabled = false;
      }
      else {
        document.getElementById("submitButton").disabled = true;
      } 
    } 
  }
  render() {
    return (
      <div>
        <div class="header">
          <table id="headerTable" className='my-2 table'>
            <thead>
              <tr>
                <th scope="col"> <button id="backButton" class="previous round" onClick={() => {
                  this.props.show_dashboard();
                  this.setStateForNext();
                }}>&#8249;</button></th>
                <th scope="col">
                  <div className="text-left lead">
                    <h5>{this.state.selected_category_name}</h5>
                  </div>
                </th>
                <th style={{ "width": "70%" }}>
                  <div style={{ "width": "100%" }}>
                    <input type="text" class="form-control" placeholder="Search product name here..." onChange={(e) => {
                      this.setState({
                        search_product_name: e.target.value
                      })
                    }} />
                  </div>
                </th>
                <th scope="col"> <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#addItem" onClick={() => { this.setStateForNext(); }}> + Add Item</button></th>
                <div class="modal fade bd-example-modal-lg" data-keyboard="false" data-backdrop="static" id="addItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content" id="guidedTour-modal">
                      <div className="modal-header">
                        <h5 className="modal-title">Add New Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                          this.setState({
                            "add-details-category-id": 0,
                            "screenCount":0
                          });
                          this.remove_previous_details();
                        }}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{ "height": "45vw" }}>
                        <table style={{ "height": "100%", "width": "100%" }}>
                          <tr>
                            <td style={{"height":"300px"}}>
                              
                              {(()=>{
                                 if (this.state.screenCount == 0){
                                   return(
                                     <div>
                                    <div style={{"height":"250px", "width":"auto"}}>
                                      <img src={require('./assets/image.svg').default} style={{"width":"100%", "height":"100%"}} alt='mySvgImage' />
                                    </div>
                                      <div>
                                        </div>    
                                       <input class="form-control mt-5 ml-4 p-4 font-weight-bold" style={{ "border": "none", "backgroundColor": "whitesmoke", "borderRadius": "7px", "outline": "none", "color": "#007FFF", "font-family": "Poppins, sans-serif", "width":"80%" }} placeholder="Enter product name here." value={this.state["add-product-name"]} onChange={(e) => {
                                         this.setStateForNext();
                                          this.setState({
                                             "add-product-name": e.target.value,
                                           })
                                          }} />
                                        </div>
                                   )
                                 }
                                 else if (this.state.screenCount == 1){
                                   return(
                                     <div>
                                       <table>
                                         <tr>
                                           <td id="buttonTD">
                                              <button id="backButton" class="previous round" onClick={() => {
                                             var count = this.state.screenCount
                                             count = count - 1
                                             this.setState({
                                               screenCount: count
                                             },function(){
                                               this.setStateForNext();
                                             })
                                              
                                           }}>&#8249;</button></td>
                                           <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                             Upload Tracking Image
                                           </div></td>
                                         </tr>
                                       </table>
                                       <div id="tracking-image-preview" className='border border-primary mt-4' style={{ "display": "inline-flex", "flexDirection": "row", "width": "15vw", "height": "30vh", "border-radius": "7px", backgroundImage: `url(${this.state.tracking_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.tracking_image_upload_icon_svg})`, "backgroundSize": `${this.state.tracking_image_upload_icon_svg == undefined ? "30px 30px" : "auto 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important" }}>
                                         <input accept="image/*" type='file' name="tracking-image-input" onChange={
                                           (event) => {
                                             this.upload_input_image(event, "tracking-image-preview");
                                             
                                           }
                                         } />
                                       </div>
                                     </div>
                                   )
                                 }
                                 else if (this.state.screenCount == 2) {
                                   return (
                                     <div>
                                       <table>
                                         <tr>
                                           <td id="buttonTD"> <button id="backButton" class="previous round" onClick={() => {
                                             var count = this.state.screenCount
                                             count = count - 1
                                             this.setState({
                                               screenCount: count
                                             }, function () {
                                               this.setStateForNext();
                                             })
                                           }}>&#8249;</button></td>
                                           <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                             Enter Product Description
                                           </div></td>
                                         </tr>
                                       </table>
                                       <textarea autosize class="form-control mt-4" value={this.state["add-product-text-description"]} rows="10" onChange={(event) => {var description = event.target.value;this.setState({"add-product-text-description": description})}}></textarea>
                                     </div>
                                   )
                                 }
                                 else if (this.state.screenCount == 3) {
                                   return (
                                     <div>
                                       <table>
                                         <tr>
                                           <td id="buttonTD">
                                             <button id="backButton" class="previous round" onClick={() => {
                                               var count = this.state.screenCount
                                               count = count - 1
                                               this.setState({
                                                 screenCount: count
                                               }, function () {
                                                 this.setStateForNext();
                                               })
                                             }}>&#8249;</button></td>
                                           <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                             Upload Product Image
                                           </div></td>
                                         </tr>
                                       </table>
                                       <div id="product-image-preview" className='border border-primary mt-4' style={{ "display": "inline-flex", "flexDirection": "row", "width": "15vw", "height": "30vh", "border-radius": "7px", backgroundImage: `url(${this.state.product_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.product_image_upload_icon_svg})`, "backgroundSize": `${this.state.product_image_upload_icon_svg == undefined ? "30px 30px" : "auto 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important", "margin-right":"50%" }}>
                                         <input accept="image/*" type='file' name="product-image-input" onChange={
                                           (event) => {
                                             this.upload_input_image(event, "product-image-preview")
                                           }
                                         } />
                                       </div>
                                     </div>
                                   )
                                 }
                                 else if (this.state.screenCount == 4) {
                                   return (
                                     <div>
                                       <table>
                                         <tr>
                                           <td id="buttonTD">
                                             <button id="backButton" class="previous round" onClick={() => {
                                               var count = this.state.screenCount
                                               count = count - 1
                                               this.setState({
                                                 screenCount: count
                                               }, function () {
                                                 this.setStateForNext();
                                               })
                                             }}>&#8249;</button></td>
                                           <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                             Upload Product Video
                                           </div></td>
                                         </tr>
                                       </table>
                                       <video id="video_here" src={this.state['product-video-file-url']} style={{ "width": "100%", "height": "200px" }} controls>
                                         <source />
                                         Your browser does not support HTML5 video.
                                       </video>
                                       <input style={{ "opacity": "1" }} type="file" name="file[]" class="file_multi_video" accept="video/*" onChange={(event) => { this.get_product_video(event) }}></input>
                                     </div>
                                   )
                                 }
                                 else if (this.state.screenCount == 5) {
                                   return (
                                     <div>
                                       <table>
                                         <tr>
                                           <td id="buttonTD">
                                             <button id="backButton" class="previous round" onClick={() => {
                                               var count = this.state.screenCount
                                               count = count - 1
                                               this.setState({
                                                 screenCount: count
                                               }, function () {
                                                 this.setStateForNext();
                                               })
                                             }}>&#8249;</button></td>
                                           <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                             Upload Product Audio
                                           </div></td>
                                         </tr>
                                       </table>
                                       <audio className="mt-4" src={this.state["product-audio-file-url"]} id="audio" controls>
                                         <source id="src" />
                                       </audio>
                                       <input className="mt-3" style={{ "opacity": "1" }} type="file" id="upload" onChange={(event) => {
                                         this.get_product_audio(event);
                                       }} />
                                     </div>
                                   )
                                 }
                                 else{
                                   return(
                                     <table className='w-100 text-left'>
                                       <tr>
                                         <table>
                                           <tr>
                                             <td id="buttonTD">
                                               <button id="backButton" class="previous round" onClick={() => {
                                                 var count = this.state.screenCount
                                                 count = count - 1
                                                 this.setState({
                                                   screenCount: count
                                                 }, function () {
                                                   this.setStateForNext();
                                                 })
                                               }}>&#8249;</button></td>
                                             <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                               Add to cart details
                                             </div></td>
                                           </tr>
                                         </table>
                                       </tr>
                                       <tr>
                                         <td style={{ "padding-left": "0px" }}>
                                           <div className="my-1 mx-2 text-left lead">
                                             <strong>Minimum Quantity</strong>
                                           </div>
                                           <div class="form-group">
                                             <input class="form-control mx-2 w-75" type="number" min={0} max={100} step={1} placeholder="Enter mimimum quantity" value={this.state.new_category_name} onChange={(e) => {
                                               this.setState({
                                                 "add-product-minimum-quantity": e.target.value
                                               })
                                             }} />
                                           </div>
                                           <div className="my-1 mx-2 text-left lead">
                                             <strong>Maximum Quantity</strong>
                                           </div>
                                           <div class="form-group">
                                             <input class="form-control mx-2 w-75" type="number" min={0} step={1} placeholder="Enter maximum quantity" value={this.state.new_category_name} onChange={(e) => {
                                               this.setState({
                                                 "add-product-maximum-quantity": e.target.value
                                               })
                                             }} />
                                           </div>
                                           <div className="my-1 mx-2 text-left lead">
                                             <strong>Price (₹)</strong>
                                           </div>
                                           <div class="form-group">
                                             <input class="form-control mx-2 w-75" type="number" min={0} placeholder="Enter price here." value={this.state.new_category_name} onChange={(e) => {
                                               this.setState({
                                                 "add-product-price": e.target.value
                                               })
                                             }} />
                                           </div>
                                         </td>
                                       </tr>
                                       <tr>
                                       </tr>
                                     </table>
                                   )
                                 }
                              })()}
                              {(()=>{
                                if (this.state.screenCount == 6){
                                  return(
                                    <button type="button" id="submitButton" data-dismiss="modal" aria-label="Close" class="btn mt-5" style={{ "margin-left": "-20px", "backgroundColor": "#007FFF", "color": "white", "borderRadius": "10px", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "paddingLeft": "40px", "paddingRight": "40px" }} onClick={() => {
                                      this.setState({
                                        screenCount: 0,
                                      })
                                      this.post_data_to_server("post");
                                      this.remove_previous_details();
                                    }}>Submit</button>
                                  )
                                }
                                else if (this.state.screenCount <6){
                                  return(
                                    <button type="button" id="nextButton" class="btn mt-5" style={{ "margin-left": "-20px", "backgroundColor": "#007FFF", "color": "white", "borderRadius": "10px", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "paddingLeft": "30px", "paddingRight": "30px" }} onClick={() => {
                                      var count = this.state.screenCount
                                      count = count + 1
                                      this.setState({
                                        screenCount: count,
                                      }, function () {
                                        this.setStateForNext();
                                      })
                                      
                                    }}>Next step &nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i></button>
                                  )
                                }
                               
                              })()}
                              <br/>
                              <br />
                              <br />
                              <div class="btn-group dropup">
                              {/* <button type="button" class="btn btn-secondary dropdown-toggle" style={{ "margin-left": "250px", "backgroundColor": "#007FFF", "color": "white", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px" }}>Add details&nbsp;&nbsp;<i class="fa-solid fa-bars"></i></button> */}
                                <div class="btn-group dropup">
                                  <button type="button" class="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ "margin-left": "270px", "backgroundColor": "#007FFF", "color": "white", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "borderRadius":"4px" }}><i class="fa-solid fa-bars"></i></button>
                                  <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" onClick={()=>{
                                      this.setState({
                                        screenCount:1
                                      },function(){
                                        this.setStateForNext();
                                      })
                                    }}>Upload Tracking Image</a>
                                    <a class="dropdown-item" href="#" onClick={() => {
                                      this.setState({
                                        screenCount: 2
                                      }, function () {
                                        this.setStateForNext();
                                      })
                                      
                                    }}>Upload Product Description</a>
                                    <a class="dropdown-item" href="#" onClick={() => {
                                      this.setState({
                                        screenCount: 3
                                      }, function () {
                                        this.setStateForNext();
                                      })
                                    }}>Upload Product Image</a>
                                    <a class="dropdown-item" href="#" onClick={() => {
                                      this.setState({
                                        screenCount: 4
                                      })
                                    }}>Upload Product Video</a>
                                    <a class="dropdown-item" href="#" onClick={() => {
                                      this.setState({
                                        screenCount: 5
                                      }, function () {
                                        this.setStateForNext();
                                      })
                                    }}>Upload Product Audio</a>
                                    <a class="dropdown-item" href="#" onClick={() => {
                                      this.setState({
                                        screenCount: 6
                                      }, function () {
                                        this.setStateForNext();
                                      })
                                    }}>Add to Cart</a>
                                    <div class="dropdown-divider"></div>
                                  </div>
                                </div>
                              </div>
                            </td>   
                            <td class="w-50" style={{"backgroundColor":"whitesmoke", "borderRadius":"10px"}}>
                              <div className='lead '>
                                Preview
                              </div>
                              <div style={{ "width": "100%", "height": "auto" }}>
                                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                  <div class="carousel-inner">
                                    <div class="carousel-item active">
                                      <img class="corousel-img" src={this.state.tracking_image_upload_icon_svg == undefined ? blank_image : this.state.tracking_image_upload_icon_svg} style={{ "height": this.state.tracking_image_upload_icon_svg == undefined ? "100% !important" : "180px", "width": this.state.tracking_image_upload_icon_svg == undefined ? "100% !important" : "", "object-fit": "fit" }} alt="First slide" />
                                      <h5>Tracking Image</h5>
                                    </div>
                                    <div class="carousel-item">
                                      <img class="corousel-img" src={this.state.product_image_upload_icon_svg == undefined ? blank_image : this.state.product_image_upload_icon_svg} style={{ "height": this.state.product_image_upload_icon_svg == undefined ? "100% !important" : "150px", "width": this.state.product_image_upload_icon_svg == undefined ? "auto !important" : "" }} alt="Second slide" />
                                      <h5>Product Image</h5>
                                    </div>
                                    <div class="carousel-item">
                                      <video id="video_here" style={{ "width": "100%", "height": "200px" }} controls>
                                        <source />
                                        Your browser does not support HTML5 video.
                                      </video>
                                      <h5>Product Video</h5>
                                    </div>
                                    <div class="carousel-item">
                                      {/* <iframe class="embed-responsive-item" src={this.state['product-audio']} allow=""></iframe> */}
                                      <audio id="audio" controls>
                                        <source id="src" />
                                      </audio>
                                      <h5>Product Audio</h5>
                                    </div>
                                  </div>
                                  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                  </a>
                                  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                  </a>
                                </div>
                              </div>
                              <table>
                                <tr>
                                  <td className='lead text-center' style={{ "width": "100vw" }}>
                                    {this.state["add-product-name"]}
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-center'>
                                    <div style={{ "max-height": "100px", "overflow": "scroll", "textAlign": "center" }}>{this.state["add-product-text-description"]}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className='text-center'>
                                      <span>Max Qty: </span><span>{this.state['add-product-maximum-quantity']}</span>
                                      <span className='ml-2'>Min Qty: </span><span>{this.state['add-product-minimum-quantity']}</span>
                                      <span className='ml-2'>Price: </span><span>{this.state['add-product-price']}</span>₹
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td> 
                          </tr>  
                        </table>  
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </thead>
          </table>
          <table class="table table-bordered table-responsive">
            <thead>
              <th class="text-center"  >Product Image</th>
              <th  class="text-center"  >Product Name</th>
              <th  class="text-center" >Date Added</th>
              <th  class="text-center"> Scans</th>
              <th  >Min. Qty.</th>
              <th  >Max. Qty</th>
              <th  class="text-center">In Stock</th>
              <th  class="text-center">Price/pc.</th>
              <th  class="text-center">Edit</th>
              <th  class="text-center">Delete</th>
              <th  class="text-center">Publish</th>

            </thead>
            <tbody>
              {(() => {
                if (this.state.search_product_name != "") {
                  return (
                    this.state.items.filter(item => String(item.ProductName).includes(this.state.search_product_name)).filter(item => String(item.Category).includes(this.state["selected_category_name"])).map(
                      (item, index) => {
                          return (
                            <tr scope="row" style={{ "backgroundColor": item.Publish == "true" ? "whitesmoke" : "transparent" }}>
                              <td style={{ "width": "100px !important" }}>{item.PromoImage}</td>
                              <td style={{ "width": "100px !important" }}>{item.ProductName}</td>
                              <td style={{ "width": "100px !important" }}>{String(item.DateTime).split("T")[0]}</td>
                              <td>{Math.floor(Math.random() * 10000)}</td>
                              <td>{item.MinimumQty}</td>
                              <td>{item.MaximumQty}</td>
                              <td>{item.InStock}</td>
                              <td>{item.Price}</td>
                              <td><i class="fa-solid fa-pen-to-square"></i></td>
                              <td><i class="fa-solid fa-trash-can"></i></td>
                              <td><i class="fa-solid fa-upload"></i></td>
                            </tr>
                          )                        
                      })
                  )
                }
                else {
                    return (
                      this.state.items.filter(item => String(item.Category).includes(this.state["selected_category_name"])).map(
                        (item, index) => {
                          return (
                            <tr scope="row" style={{ "backgroundColor": item.Publish == "true" ? "whitesmoke" : "transparent" }} >
                              {/* <td style={{ "width": "100px !important" }}>{item.PromoImage}</td> */}
                              <td><img style={{ "height": "50px", "auto": "auto" }} src={item.PromoImage} onerror={blank_image}></img></td>
                              <td>{item.ProductName}</td>
                              <td>{String(item.DateTime).split("T")[0]}</td>
                              <td>{Math.floor(Math.random() * 10000)}</td>
                              <td>{item.MinimumQty}</td>
                              <td>{item.MaximumQty}</td>
                              <td>{item.InStock}</td>
                              <td>{item.Price}</td>
                              <td> <button style={{ "border": 0, "outline": "none", "backgroundColor": "white" }} data-toggle="modal" data-target="#editItem" onClick={() => { this.editItem(item, index) }} ><i class="fa-solid fa-pen-to-square"></i></button></td>
                              <div class="modal fade bd-example-modal-lg" data-keyboard="false" data-backdrop="static" id="editItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                  <div className="modal-content" id="guidedTour-modal">
                                    <div className="modal-header">
                                      <h5 className="modal-title">Edit {this.state["add-product-name"]}</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                                        this.setState({
                                          "add-details-category-id": 0,
                                          "screenCount": 0
                                        });
                                        this.remove_previous_details();
                                      }}>
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body" style={{ "height": "45vw" }}>
                                      <table style={{ "height": "100%", "width": "100%" }}>
                                        <tr>
                                          <td style={{ "height": "300px" }}>

                                            {(() => {
                                              if (this.state.screenCount == 0) {
                                                return (
                                                  <div>
                                                    <div style={{ "height": "250px", "width": "auto" }}>
                                                      <img src={require('./assets/image.svg').default} style={{ "width": "100%", "height": "100%" }} alt='mySvgImage' />
                                                    </div>
                                                    <div>
                                                    </div>
                                                    <input class="form-control mt-5 ml-4 p-4 font-weight-bold" style={{ "border": "none", "backgroundColor": "whitesmoke", "borderRadius": "7px", "outline": "none", "color": "#007FFF", "font-family": "Poppins, sans-serif", "width": "80%" }} placeholder="Enter product name here." value={this.state["add-product-name"]} onChange={(e) => {
                                                      this.setState({
                                                        "add-product-name": e.target.value,
                                                      })
                                                    }} />
                                                  </div>
                                                )
                                              }
                                              else if (this.state.screenCount == 1) {
                                                return (
                                                  <div>
                                                    <table>
                                                      <tr>
                                                        <td id="buttonTD">
                                                          <button id="backButton" class="previous round" onClick={() => {
                                                            var count = this.state.screenCount
                                                            count = count - 1
                                                            this.setState({
                                                              screenCount: count
                                                            }, function () {
                                                              this.setStateForNext();
                                                            })
                                                          }}>&#8249;</button></td>
                                                        <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                                          Upload Tracking Image
                                                        </div></td>
                                                      </tr>
                                                    </table>
                                                    <div id="tracking-image-preview" className='border border-primary mt-4' style={{ "display": "inline-flex", "flexDirection": "row", "width": "15vw", "height": "30vh", "border-radius": "7px", backgroundImage: `url(${this.state.tracking_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.tracking_image_upload_icon_svg})`, "backgroundSize": `${this.state.tracking_image_upload_icon_svg == undefined ? "30px 30px" : "auto 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important" }}>
                                                      <input accept="image/*" type='file' name="tracking-image-input" onChange={
                                                        (event) => {
                                                          this.upload_input_image(event, "tracking-image-preview")
                                                        }
                                                      } />
                                                    </div>
                                                  </div>
                                                )
                                              }
                                              else if (this.state.screenCount == 2) {
                                                return (
                                                  <div>
                                                    <table>
                                                      <tr>
                                                        <td id="buttonTD"> <button id="backButton" class="previous round" onClick={() => {
                                                          var count = this.state.screenCount
                                                          count = count - 1
                                                          this.setState({
                                                            screenCount: count
                                                          }, function () {
                                                            this.setStateForNext();
                                                          })
                                                        }}>&#8249;</button></td>
                                                        <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                                          Enter Product Description
                                                        </div></td>
                                                      </tr>
                                                    </table>
                                                    <textarea autosize class="form-control mt-4" value={this.state["add-product-text-description"]} rows="10" onChange={(event) => { var description = event.target.value; this.setState({ "add-product-text-description": description }) }}></textarea>
                                                  </div>
                                                )
                                              }
                                              else if (this.state.screenCount == 3) {
                                                return (
                                                  <div>
                                                    <table>
                                                      <tr>
                                                        <td id="buttonTD">
                                                          <button id="backButton" class="previous round" onClick={() => {
                                                            var count = this.state.screenCount
                                                            count = count - 1
                                                            this.setState({
                                                              screenCount: count
                                                            }, function () {
                                                              this.setStateForNext();
                                                            })
                                                          }}>&#8249;</button></td>
                                                        <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                                          Upload Product Image
                                                        </div></td>
                                                      </tr>
                                                    </table>
                                                    <div id="product-image-preview" className='border border-primary mt-4' style={{ "display": "inline-flex", "flexDirection": "row", "width": "15vw", "height": "30vh", "border-radius": "7px", backgroundImage: `url(${this.state.product_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.product_image_upload_icon_svg})`, "backgroundSize": `${this.state.product_image_upload_icon_svg == undefined ? "30px 30px" : "auto 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important", "margin-right": "50%" }}>
                                                      <input accept="image/*" type='file' name="product-image-input" onChange={
                                                        (event) => {
                                                          this.upload_input_image(event, "product-image-preview")
                                                        }
                                                      } />
                                                    </div>
                                                  </div>
                                                )
                                              }
                                              else if (this.state.screenCount == 4) {
                                                return (
                                                  <div>
                                                    <table>
                                                      <tr>
                                                        <td id="buttonTD">
                                                          <button id="backButton" class="previous round" onClick={() => {
                                                            var count = this.state.screenCount
                                                            count = count - 1
                                                            this.setState({
                                                              screenCount: count
                                                            }, function () {
                                                              this.setStateForNext();
                                                            })
                                                          }}>&#8249;</button></td>
                                                        <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                                          Upload Product Video
                                                        </div></td>
                                                      </tr>
                                                    </table>
                                                    <video id="video_here" src={this.state['product-video-file-url']} style={{ "width": "100%", "height": "200px" }} controls>
                                                      <source />
                                                      Your browser does not support HTML5 video.
                                                    </video>
                                                    <input style={{ "opacity": "1" }} type="file" name="file[]" class="file_multi_video" accept="video/*" onChange={(event) => { this.get_product_video(event) }}></input>
                                                  </div>
                                                )
                                              }
                                              else if (this.state.screenCount == 5) {
                                                return (
                                                  <div>
                                                    <table>
                                                      <tr>
                                                        <td id="buttonTD">
                                                          <button id="backButton" class="previous round" onClick={() => {
                                                            var count = this.state.screenCount
                                                            count = count - 1
                                                            this.setState({
                                                              screenCount: count
                                                            }, function () {
                                                              this.setStateForNext();
                                                            })
                                                          }}>&#8249;</button></td>
                                                        <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                                          Upload Product Audio
                                                        </div></td>
                                                      </tr>
                                                    </table>
                                                    <audio className="mt-4" src={this.state["product-audio-file-url"]} id="audio" controls>
                                                      <source id="src" />
                                                    </audio>
                                                    <input className="mt-3" style={{ "opacity": "1" }} type="file" id="upload" onChange={(event) => {
                                                      this.get_product_audio(event);
                                                    }} />
                                                  </div>
                                                )
                                              }
                                              else {
                                                return (
                                                  <table className='w-100 text-left'>
                                                    <tr>
                                                      <table>
                                                        <tr>
                                                          <td id="buttonTD">
                                                            <button id="backButton" class="previous round" onClick={() => {
                                                              var count = this.state.screenCount
                                                              count = count - 1
                                                              this.setState({
                                                                screenCount: count
                                                              }, function () {
                                                                this.setStateForNext();
                                                              })
                                                            }}>&#8249;</button></td>
                                                          <td> <div className=' ml-2 lead' style={{ "textAlign": "start", "fontSize": "3vh", color: "black" }}>
                                                            Add to cart details
                                                          </div></td>
                                                        </tr>
                                                      </table>
                                                    </tr>
                                                    <tr>
                                                      <td style={{ "padding-left": "0px" }}>
                                                        <div className="my-1 mx-2 text-left lead">
                                                          <strong>Minimum Quantity</strong>
                                                        </div>
                                                        <div class="form-group">
                                                          <input class="form-control mx-2 w-75" type="number" min={0} max={100} step={1} placeholder="Enter mimimum quantity" value={this.state["add-product-minimum-quantity"]} onChange={(e) => {
                                                            this.setState({
                                                              "add-product-minimum-quantity": e.target.value
                                                            })
                                                          }} />
                                                        </div>
                                                        <div className="my-1 mx-2 text-left lead">
                                                          <strong>Maximum Quantity</strong>
                                                        </div>
                                                        <div class="form-group">
                                                          <input class="form-control mx-2 w-75" type="number" min={0} step={1} placeholder="Enter maximum quantity" value={this.state["add-product-maximum-quantity"]} onChange={(e) => {
                                                            this.setState({
                                                              "add-product-maximum-quantity": e.target.value
                                                            })
                                                          }} />
                                                        </div>
                                                        <div className="my-1 mx-2 text-left lead">
                                                          <strong>Price (₹)</strong>
                                                        </div>
                                                        <div class="form-group">
                                                          <input class="form-control mx-2 w-75" type="number" min={0} placeholder="Enter price here." value={this.state["add-product-price"]} onChange={(e) => {
                                                            this.setState({
                                                              "add-product-price": e.target.value
                                                            })
                                                          }} />
                                                        </div>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                    </tr>
                                                  </table>
                                                )
                                              }
                                            })()}
                                            {(() => {
                                              if (this.state.screenCount == 6) {
                                                return (
                                                  <button type="button" data-dismiss="modal" aria-label="Close" class="btn mt-5" style={{ "margin-left": "-20px", "backgroundColor": "#007FFF", "color": "white", "borderRadius": "10px", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "paddingLeft": "40px", "paddingRight": "40px" }} onClick={() => {
                                                    this.setState({
                                                      screenCount: 0,
                                                    })
                                                    this.post_data_to_server("edit");
                                                    this.remove_previous_details();
                                                  }}>Save Changes</button>
                                                )
                                              }
                                              else if (this.state.screenCount < 6) {
                                                return (
                                                  <button type="button" id="nextButton" class="btn mt-5" style={{ "margin-left": "-20px", "backgroundColor": "#007FFF", "color": "white", "borderRadius": "10px", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "paddingLeft": "30px", "paddingRight": "30px" }} onClick={() => {
                                                    var count = this.state.screenCount
                                                    count = count + 1

                                                    this.setState({
                                                      screenCount: count,
                                                    }, function () {
                                                      this.setStateForNext();
                                                    })

                                                  }}>Next step &nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i></button>
                                                )
                                              }

                                            })()}
                                            <br />
                                            <br />
                                            <br />
                                            <div class="btn-group dropup">
                                              {/* <button type="button" class="btn btn-secondary dropdown-toggle" style={{ "margin-left": "250px", "backgroundColor": "#007FFF", "color": "white", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px" }}>Add details&nbsp;&nbsp;<i class="fa-solid fa-bars"></i></button> */}
                                              <div class="btn-group dropup">
                                                <button type="button" class="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ "margin-left": "270px", "backgroundColor": "#007FFF", "color": "white", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "borderRadius": "4px" }}><i class="fa-solid fa-bars"></i></button>
                                                <div class="dropdown-menu">
                                                  <a class="dropdown-item" href="#" onClick={() => {
                                                    this.setState({
                                                      screenCount: 1
                                                    })
                                                  }}>Upload Tracking Image</a>
                                                  <a class="dropdown-item" href="#" onClick={() => {
                                                    this.setState({
                                                      screenCount: 2
                                                    }, function () {
                                                      this.setStateForNext();
                                                    })
                                                  }}>Upload Product Description</a>
                                                  <a class="dropdown-item" href="#" onClick={() => {
                                                    this.setState({
                                                      screenCount: 3
                                                    })
                                                  }}>Upload Product Image</a>
                                                  <a class="dropdown-item" href="#" onClick={() => {
                                                    this.setState({
                                                      screenCount: 4
                                                    })
                                                  }}>Upload Product Video</a>
                                                  <a class="dropdown-item" href="#" onClick={() => {
                                                    this.setState({
                                                      screenCount: 5
                                                    })
                                                  }}>Upload Product Audio</a>
                                                  <a class="dropdown-item" href="#" onClick={() => {
                                                    this.setState({
                                                      screenCount: 6
                                                    })
                                                  }}>Add to Cart</a>
                                                  <div class="dropdown-divider"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="w-50" style={{ "backgroundColor": "whitesmoke", "borderRadius": "10px" }}>
                                            <div className='lead '>
                                              Preview
                                            </div>
                                            <div style={{ "width": "100%", "height": "auto" }}>
                                              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                                <div class="carousel-inner">
                                                  <div class="carousel-item active">
                                                    <img class="corousel-img" src={this.state.tracking_image_upload_icon_svg == undefined ? blank_image : this.state.tracking_image_upload_icon_svg} style={{ "height": this.state.tracking_image_upload_icon_svg == undefined ? "100% !important" : "180px", "width": this.state.tracking_image_upload_icon_svg == undefined ? "100% !important" : "", "object-fit": "fit" }} alt="First slide" />
                                                    <h5>Tracking Image</h5>
                                                  </div>
                                                  <div class="carousel-item">
                                                    <img class="corousel-img" src={this.state.product_image_upload_icon_svg == undefined ? blank_image : this.state.product_image_upload_icon_svg} style={{ "height": this.state.product_image_upload_icon_svg == undefined ? "100% !important" : "150px", "width": this.state.product_image_upload_icon_svg == undefined ? "auto !important" : "" }} alt="Second slide" />
                                                    <h5>Product Image</h5>
                                                  </div>
                                                  <div class="carousel-item">
                                                    <video id="video_here" style={{ "width": "100%", "height": "200px" }} controls>
                                                      <source />
                                                      Your browser does not support HTML5 video.
                                                    </video>
                                                    <h5>Product Video</h5>
                                                  </div>
                                                  <div class="carousel-item">
                                                    {/* <iframe class="embed-responsive-item" src={this.state['product-audio']} allow=""></iframe> */}
                                                    <audio id="audio" controls>
                                                      <source id="src" />
                                                    </audio>
                                                    <h5>Product Audio</h5>
                                                  </div>
                                                </div>
                                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                  <span class="sr-only">Previous</span>
                                                </a>
                                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                  <span class="sr-only">Next</span>
                                                </a>
                                              </div>
                                            </div>
                                            <table>
                                              <tr>
                                                <td className='lead text-center' style={{ "width": "100vw" }}>
                                                  {this.state["add-product-name"]}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='text-center'>
                                                  <div style={{ "max-height": "100px", "overflow": "scroll", "textAlign": "center" }}>{this.state["add-product-text-description"]}</div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div className='text-center'>
                                                    <span>Max Qty: </span><span>{this.state['add-product-maximum-quantity']}</span>
                                                    <span className='ml-2'>Min Qty: </span><span>{this.state['add-product-minimum-quantity']}</span>
                                                    <span className='ml-2'>Price: </span><span>{this.state['add-product-price']}</span>₹
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <td><button style={{ "border": 0, "outline": "none", "backgroundColor": "white" }} onClick={() => { this.deleteProduct(item, index) }}><i class="fa-solid fa-trash-can"></i></button></td>
                              <td><button style={{ "border": 0, "outline": "none", "backgroundColor": "white" }} onClick={() => { this.publishProduct(item) }}><i class="fa-solid fa-upload"></i></button></td>
                            </tr>
                          )
                        })
                    )
                }
              })()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


