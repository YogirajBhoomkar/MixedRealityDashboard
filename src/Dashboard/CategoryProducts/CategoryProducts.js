import React, { Component } from 'react'
import './CategoryProducts.css'
import image_upload_icon_svg from '../assets/arrow-up-from-bracket-solid.svg'
import blank_image from '../assets/blank_image.svg'
import axios from 'axios'
import Toast from '../../Toast/Toast'
export default class CategoryProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {

      items: [],
      search_product_name: "",
      "add-details-category-id": 0,
      "details-added-count": 0,
      "selected_category_name": "category name should come here",

      "add-product-name": "Your Product Name.",
      "target_image_upload_icon_svg": undefined,
      "product_target_image": undefined,

      "add-product-image-title": "Your Product Image Title.",
      "product_image_upload_icon_svg": undefined,
      "product_image": undefined,

      "add-product-video-title": "Your Product Video Title.",
      "product-video": undefined,

      "add-product-audio-title": "Your Product Audio Title.",
      "product-audio": undefined,

      "add-product-minimum-quantity": 0,
      "add-product-maximum-quantity": 0,
      "add-product-discount": 0,

      "add-product-text-description": "Your Product Description.",

    }

  }
  componentDidMount() {
    this.setState({
      selected_category_name: this.props.selected_category_name,
    })
    this.get_updated_list_of_items_from_server();
    // document.getElementById("target-image-preview").style.backgroundSize = "30px 30px"
    // document.getElementById("product-image-preview").style.backgroundSize = "30px 30px"
    this.getProductList();
  }
  upload_target_image(event, id) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    var thisRef = this;
    reader.onloadend = function (e) {
      if (id == "target-image-preview") {
        thisRef.setState({
          target_image_upload_icon_svg: [reader.result],
          product_target_image: file
        })
      } else if (id == "product-image-preview") {
        thisRef.setState({
          product_image_upload_icon_svg: [reader.result],
          product_image: file,
        })
      }

    }.bind(this);
    document.getElementById(id).style.backgroundSize = "100% 100%"
  }
  get_product_video(event) {
    var video = event.target.files[0]
    var fileUrl = window.URL.createObjectURL(video);
    this.setState({
      "product-video": fileUrl,
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
      "product-audio": fileUrl,
      "add-product-audio": audio,
    })
    var docs = document.querySelectorAll("#audio");
    docs[0].setAttribute("src", fileUrl);
    docs[1].setAttribute("src", fileUrl);
    docs[0].load();
    docs[1].load();
  }

  removeVideo() {
    document.getElementById("video_here").setAttribute("src", "");
  }
  removeAudio() {
    document.getElementById("audio").setAttribute("src", "");
  }
  post_data_to_server() {
    var thisRef = this;
    var category_name = this.state["selected_category_name"]
    var product_name = this.state["add-product-name"]
    var product_description = this.state["add-product-text-description"]
    var target_image = this.state["product_target_image"]
    // var product_image_title = this.state["add-product-image-title"]
    var product_image = this.state["product_image"]
    // var product_video_title = this.state["add-product-video-title"]
    var product_video = this.state["add-product-video"]
    // var audio_product_title = this.state["product-audio"]
    var product_audio = this.state["add-product-audio"]
    // var product_minimum_quantity = this.state["add-product-minimum-quantity"]
    // var product_maximum_quantity = this.state["add-product-maximum-quantity"]
    // var product_discount = this.state["add-product-discount"]



    let arrayOfYourFiles = [product_name, target_image, product_image, product_video, product_audio]
    // create formData object
    const formData = new FormData();
    formData.append("ProductName", product_name)
    formData.append("Desc", product_description)
    formData.append("Category", category_name)
    formData.append("TargetImage", target_image)
    formData.append("PromoImage", product_image)
    formData.append("Video", product_video)
    formData.append("Audio", product_audio)


    axios({
      method: "POST",
      url: process.env.REACT_APP_ADD_PRODUCT_DATA_POST_URL + "/api/uploaddata/data",
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
    var url = "http://mixed-reality-demo.azurewebsites.net/api/uploaddata/getData"
    await axios.get(url)
      .then(resp => {
        thisRef.setState({
          items: resp.data["Result"]
        })
      });
  }
  getProductList(){
    
  }
  remove_previous_details(){
    this.setState({
      "details-added-count": 0,

      "add-product-name": "Your Product Name.",
      "target_image_upload_icon_svg": undefined,
      "product_target_image": undefined,

      "add-product-image-title": "Your Product Image Title.",
      "product_image_upload_icon_svg": undefined,
      "product_image": undefined,

      "add-product-video-title": "Your Product Video Title.",
      "product-video": undefined,

      "add-product-audio-title": "Your Product Audio Title.",
      "product-audio": undefined,

      "add-product-minimum-quantity": 0,
      "add-product-maximum-quantity": 0,
      "add-product-discount": 0,

      "add-product-text-description": "Your Product Description.",

    })
  }
  check_if_sufficient_data_added() {
    var category_name = this.state["selected_category_name"]
    var product_name = this.state["add-product-name"]
    var product_description = this.state["add-product-text-description"]
    var target_image = this.state["product_target_image"]
    var product_image = this.state["product_image"]
    var product_video = this.state["add-product-video"]
    var product_audio = this.state["add-product-audio"]
    var product_minimum_quantity = this.state["add-product-minimum-quantity"]
    var product_maximum_quantity = this.state["add-product-maximum-quantity"]
    var product_discount = this.state["add-product-discount"]
    var count = 0
    console.log(category_name, product_name, product_description, target_image, product_image, product_video, product_audio)
    if (product_description != "Your Product Description." || product_description !="") {
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
    if (product_discount != 0) {
      count += 1
    }
    console.log("new count is", count)
    this.setState({
      "details-added-count": count
    })
  }

  deleteProduct(item, index) {
    var id = item.Id
    var category = item.Category
    var thisRef = this
    var url = "http://mixed-reality-demo.azurewebsites.net/api/uploaddata/deleteEntry?id=" + id + "&category=" + category;
    axios.delete(url).then(resp => {
      if (resp.status == 200) {
        thisRef.get_updated_list_of_items_from_server();
      }
    })
  }
  editIterm(item,index){
    var id=item.Id
    var category=item.Category
    var getUrl = "https://localhost:44338/api/uploaddata/getItem?id=" + id + "&category=" + category
    axios.get(getUrl).then(resp=>{
      console.log(resp)
    })
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
                <th scope="col"> <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#addItem"> + Add Item</button></th>
                <div class="modal fade bd-example-modal-lg" data-keyboard="false" data-backdrop="static" id="addItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content" id="guidedTour-modal">
                      <div className="modal-header">
                        <h5 className="modal-title">Add Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                          this.setState({
                            "add-details-category-id": 0
                          })
                        }}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{ "height": "45vw" }}>
                        <table style={{ "height": "100%", "width": "100%" }}>
                          <tr>
                            <td class="w-50">
                              {(() => {
                                if (this.state['add-details-category-id'] == 0) {
                                  return (
                                    <div>
                                      <div className="my-3 mx-2 text-left lead">
                                        <strong>Name of the Product</strong>
                                      </div>
                                      <div class="form-group">
                                        <input class="form-control mx-2 w-75" aria-describedby="emailHelp" placeholder="Enter product name here." value={this.state["add-product-name"]} onChange={(e) => {
                                          this.setState({
                                            "add-product-name": e.target.value,
                                          })
                                        }} />
                                      </div>
                                      <div className="my-4 mt-5 mb-1 text-left lead" style={{ "margin-top": "5vh !important" }}>
                                        <strong>Upload Tracking Image</strong>
                                      </div>
                                      <table className='w-100 mt-3 h-100'>
                                        <tr className='border-top-0' style={{ "display": "flex", "flex-direction": "row", "justify-content": "flex-start" }}>
                                          {/* <td className='w-50 my-2 text-left border-top-0' style={{ "color": "red" }}>Error message comes here</td> */}
                                          <td className='w-150 my-2 border-top-0'>
                                            <div id="target-image-preview" className='border border-primary' style={{ "display": "inline-flex", "flexDirection": "row", "width": "10vw", "height": "20vh", "border-radius": "7px", backgroundImage: `url(${this.state.target_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.target_image_upload_icon_svg})`, "backgroundSize": `${this.state.target_image_upload_icon_svg == undefined ? "30px 30px" : "auto 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important" }}>
                                              {/* <i style={{ "margin-top": "50%", "color": "#037bff" }} class="fa-solid fa-arrow-up-from-bracket"></i> */}
                                              <input accept="image/*" type='file' name="target-image-input" onChange={
                                                (event) => {
                                                  this.upload_target_image(event, "target-image-preview")
                                                }
                                                // this.upload_target_image.bind(this)
                                              } />
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colspan="2" className='text-right'>
                                            <div class="btn-group dropup my-2" style={{ "float": "right" }}>
                                              <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Add Details
                                              </button>
                                              <div class="dropdown-menu">
                                                <a class="dropdown-item" onClick={() => {
                                                  this.setState({
                                                    "add-details-category-id": 1
                                                  })
                                                }}>Text Description</a>
                                                <a class="dropdown-item" onClick={() => {
                                                  this.setState({
                                                    "add-details-category-id": 2
                                                  })
                                                }}>Product Image</a>
                                                <a class="dropdown-item" onClick={() => {
                                                  this.setState({
                                                    "add-details-category-id": 3
                                                  })
                                                }}>Video</a>
                                                <a class="dropdown-item" onClick={() => {
                                                  this.setState({
                                                    "add-details-category-id": 4
                                                  })
                                                }}>Audio</a>
                                                <a class="dropdown-item" onClick={() => {
                                                  this.setState({
                                                    "add-details-category-id": 5
                                                  })
                                                }}>3D Model</a>
                                                <a class="dropdown-item" onClick={() => {
                                                  this.setState({
                                                    "add-details-category-id": 6
                                                  })
                                                }}>Add to cart</a>
                                                {/* <!-- Dropdown menu links --> */}
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )
                                } else if (this.state['add-details-category-id'] == 1) {
                                  return (
                                    <table className='w-100 text-left'>
                                      <tr>
                                        <td style={{ "padding-left": "0px" }}>
                                          <div className="text-left lead">
                                            <strong>Text Description of the Product</strong>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <textarea autosize class="form-control" value={this.state["add-product-text-description"]} rows="10" onChange={(event) => {
                                          var description = event.target.value
                                          this.setState({
                                            "add-product-text-description": description,
                                          })
                                        }}></textarea>
                                      </tr>
                                      <tr>
                                        <td className='ml-2'>
                                          <button type="button" class="btn my-5 px-4" style={{ "backgroundColor": "whitesmoke", "color": "#037bff", "outline": "none !importatant" }} onClick={() => {
                                            var count = this.state["details-added-count"]
                                            count -= 1
                                            this.setState({
                                              "add-details-category-id": 0,
                                              "add-product-text-description": "Your Product Description.",
                                              "details-added-count": count,
                                            })
                                          }}>Cancel</button>
                                          <button type="button" class="btn ml-4 px-4" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant" }} onClick={() => {
                                            this.check_if_sufficient_data_added()
                                            this.setState({
                                              "add-details-category-id": 0,
                                            })
                                          }}>Save</button>
                                        </td>
                                      </tr>

                                    </table>
                                  )
                                }
                                else if (this.state['add-details-category-id'] == 2) {
                                  console.log(this.state.product_image_upload_icon_svg)
                                  return (
                                    <table className='w-100 text-left'>
                                      {/* <tr>
                                        <td style={{ "padding-left": "0px" }}>
                                          <div className="my-3 mx-2 text-left lead">
                                            <strong>Image Title</strong>
                                          </div>
                                          <div class="form-group">
                                            <input class="form-control mx-2 w-75" aria-describedby="emailHelp" placeholder="Enter image title" value={this.state.new_category_name} onChange={(e) => { this.setState({ "add-product-image-title": e.target.value }) }} />
                                          </div>
                                        </td>
                                      </tr> */}
                                      <tr>
                                        <div className="my-2 mt-2 mb-5 ml-2 text-left lead" >
                                          <strong>Upload Tracking Image</strong>
                                        </div>
                                        <div id="product-image-preview" className='border border-primary mb-2' style={{ "display": "inline-flex", "flexDirection": "row", "width": "10vw", "height": "20vh", "border-radius": "7px", backgroundImage: `url(${this.state.product_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.product_image_upload_icon_svg})`, "backgroundSize": `${this.state.product_image_upload_icon_svg == undefined ? "30px 30px" : "auto 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important" }}>
                                          <input accept="image/*" type='file' name="target-image-input" onChange={
                                            (event) => {
                                              this.upload_target_image(event, "product-image-preview")
                                            }
                                            // this.upload_target_image.bind(this)
                                          } />
                                        </div>
                                      </tr>
                                      <tr>
                                        <td className='ml-5'>
                                          <button type="button" class="btn my-4 px-4 ml-5" style={{ "backgroundColor": "whitesmoke", "color": "#037bff", "outline": "none !importatant" }} onClick={() => {
                                            var count = this.state["details-added-count"]
                                            count -= 1
                                            this.setState({
                                              "add-details-category-id": 0,
                                              product_image_upload_icon_svg: undefined,
                                              "details-added-count": count
                                            })
                                          }}>Cancel</button>
                                          <button type="button" class="btn ml-4 my-4 px-4" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant" }} onClick={() => {
                                            this.check_if_sufficient_data_added()
                                            this.setState({
                                              "add-details-category-id": 0,
                                            })
                                          }}>Save</button>
                                        </td>
                                      </tr>
                                    </table>
                                  )
                                }
                                else if (this.state['add-details-category-id'] == 3) {
                                  return (
                                    <table className='w-100 text-left'>
                                      {/* <tr>
                                        <td style={{ "padding-left": "0px" }}>
                                          <div className="mx-2 text-left lead">
                                            <strong>Product Video Title</strong>
                                          </div>
                                          <div class="form-group">
                                            <input class="form-control mx-2 w-75" aria-describedby="emailHelp" placeholder="Enter product video title" value={this.state.new_category_name} onChange={(e) => { }} />
                                          </div>
                                        </td>
                                      </tr> */}
                                      <tr>
                                        <video id="video_here" style={{ "width": "100%", "maxHeight": "250px" }} controls>
                                          <source />
                                          Your browser does not support HTML5 video.
                                        </video>
                                        <input style={{ "opacity": "1" }} type="file" name="file[]" class="file_multi_video" accept="video/*" onChange={(event) => { this.get_product_video(event) }}></input>
                                      </tr>
                                      <tr>
                                        <td className='ml-5'>
                                          <button type="button" class="btn my-4 ml-4 px-4" style={{ "backgroundColor": "whitesmoke", "color": "#037bff", "outline": "none !importatant" }} onClick={() => {
                                            this.removeVideo();
                                            var count = this.state["details-added-count"]
                                            count -= 1
                                            this.setState({
                                              "add-details-category-id": 0,
                                              "product-video": undefined,
                                              "details-added-count": count,

                                            })
                                          }}>Cancel</button>
                                          <button type="button" class="btn ml-4 my-4 px-4" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant" }} onClick={() => {
                                            this.check_if_sufficient_data_added()
                                            this.setState({
                                              "add-details-category-id": 0,
                                            })
                                          }}>Save</button>
                                        </td>
                                      </tr>
                                    </table>

                                  )
                                }
                                else if (this.state['add-details-category-id'] == 4) {
                                  return (
                                    <table className='w-100 text-left'>
                                      {/* <tr>
                                        <td style={{ "padding-left": "0px" }}>
                                          <div className="mx-2 my-2 text-left lead">
                                            <strong>Product Audio Title</strong>
                                          </div>
                                          <div class="form-group">
                                            <input class="form-control mx-2 w-75" aria-describedby="emailHelp" placeholder="Enter product audio title" value={this.state.new_category_name} onChange={(e) => { this.setState({ "add-product-audio-title": e.target.value }) }} />
                                          </div>
                                        </td>
                                      </tr> */}
                                      <tr>
                                        <td>
                                          <audio  id="audio" controls>
                                            <source id="src" />
                                          </audio>
                                          <input  style={{ "opacity": "1" }} type="file" id="upload" onChange={(event) => {
                                            this.get_product_audio(event);
                                          }} />
                                        </td>
                                      </tr>
                                      <td className='ml-5'>
                                        <button type="button" class="btn my-4 px-4 ml-5" style={{ "backgroundColor": "whitesmoke", "color": "#037bff", "outline": "none !importatant" }} onClick={() => {
                                          this.removeAudio();
                                          var count = this.state["details-added-count"]
                                          count -= 1
                                          this.setState({
                                            "add-details-category-id": 0,
                                            "details-added-count": count
                                          })
                                        }}>Cancel</button>
                                        <button type="button" class="btn ml-4 my-4 px-4" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant" }} onClick={() => {
                                          this.check_if_sufficient_data_added()
                                          this.setState({
                                            "add-details-category-id": 0,
                                          })
                                        }}>Save</button>
                                      </td>
                                    </table>
                                  )
                                }
                                else if (this.state['add-details-category-id'] == 5) {
                                  return (
                                    <table className='w-100 text-left'>
                                      <tr>
                                      </tr>
                                      <tr>
                                        <div className="my-2 mt-2 mb-1 text-left lead">
                                          <strong>Upload 3D Model</strong>
                                        </div>
                                        <div id="product-image-preview" className='border border-primary' style={{ "display": "inline-flex", "flexDirection": "row", "width": "10vw", "height": "20vh", "border-radius": "7px", backgroundImage: `url(${this.state.product_image_upload_icon_svg == undefined ? image_upload_icon_svg : this.state.product_image_upload_icon_svg})`, "backgroundSize": `${this.state.product_image_upload_icon_svg == undefined ? "30px 30px" : "100% 100%"}`, "color": "#037bff !important", "backgroundRepeat": "no-repeat", "background-position": "center center", "fill": "#037bff !important", "margin-top": "1vw", "margin-left": "8vw" }}>
                                          {/* <i style={{ "margin-top": "50%", "color": "#037bff" }} class="fa-solid fa-arrow-up-from-bracket"></i> */}
                                          <input accept="image/*" type='file' name="target-image-input" onChange={
                                            (event) => {
                                              this.upload_target_image(event, "product-image-preview")
                                            }
                                            // this.upload_target_image.bind(this)
                                          } />
                                        </div>
                                        <div className="my-2 mt-4 mb-1 w-75 mt-2 ml-5">
                                          <h6 className='text-center '>Upload 3D (gab/gltf format only, maximum 1000 polygons allowed)</h6>
                                        </div>
                                      </tr>
                                      <tr>
                                        <td className='ml-2'>
                                          <button type="button" class="btn my-4 px-4 mt-5" style={{ "backgroundColor": "whitesmoke", "color": "#037bff", "outline": "none !importatant" }} onClick={() => {
                                            var count = this.state["details-added-count"]
                                            count -= 1
                                            this.setState({
                                              "add-details-category-id": 0,
                                              "details-added-count": count,
                                            })
                                          }}>Cancel</button>
                                          <button type="button" class="btn ml-4 my-4 px-4 mt-5" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant" }} onClick={() => {
                                            this.check_if_sufficient_data_added()
                                            this.setState({
                                              "add-details-category-id": 0,
                                            })
                                          }}>Save</button>
                                        </td>
                                      </tr>
                                    </table>
                                  )
                                }
                                else {
                                  return (
                                    <table className='w-100 text-left'>
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
                                            <input class="form-control mx-2 w-75" type="number" min={0} max={100} step={1} placeholder="Enter maximum quantity" value={this.state.new_category_name} onChange={(e) => {
                                              this.setState({
                                                "add-product-maximum-quantity": e.target.value
                                              })
                                            }} />
                                          </div>
                                          <div className="my-1 mx-2 text-left lead">
                                            <strong>Discount (%)</strong>
                                          </div>
                                          <div class="form-group">
                                            <input class="form-control mx-2 w-75" type="number" min={0} max={100} step={1} placeholder="Enter discount here." value={this.state.new_category_name} onChange={(e) => {
                                              this.setState({
                                                "add-product-discount": e.target.value
                                              })
                                            }} />
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='ml-2'>
                                          <button type="button" class="btn my-4 px-4" style={{ "backgroundColor": "whitesmoke", "color": "#037bff", "outline": "none !importatant" }} onClick={() => {
                                            var count = this.state["details-added-count"]
                                            count -= 1
                                            this.setState({
                                              "add-details-category-id": 0,
                                              "add-product-minimum-quantity": 0,
                                              "add-product-maximum-quantity": 0,
                                              "add-product-discount": 0,
                                              "details-added-count": count,
                                            })
                                          }}>Cancel</button>
                                          <button type="button" class="btn ml-4 my-4 px-4" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant" }} onClick={() => {
                                            this.check_if_sufficient_data_added()
                                            this.setState({
                                              "add-details-category-id": 0,
                                            })
                                          }}>Save</button>
                                        </td>
                                      </tr>
                                    </table>
                                  )
                                }
                              })()}
                            </td>
                            <td id="preview-td" style={{
                              "background-color": "whitesmoke", "display": "block",
                              "height": "500px",
                              "overflow-y": "scroll",
                              "width": "100% !important",
                            }} className='border-left'>
                              <div className="my-3 mx-2 text-left lead">
                                <strong>Preview</strong>
                              </div>
                              <div style={{ "width": "100%", "height": "auto" }}>
                                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                  <div class="carousel-inner">
                                    <div class="carousel-item active">
                                      <img class="corousel-img" src={this.state.target_image_upload_icon_svg == undefined ? blank_image : this.state.target_image_upload_icon_svg} style={{ "height": this.state.target_image_upload_icon_svg == undefined ? "100% !important" : "120px", "width": this.state.target_image_upload_icon_svg == undefined ? "auto !important" : "" }} alt="First slide" />
                                      <h5>Target Image</h5>
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
                                      <span className='ml-2'>Discount(%): </span><span>{this.state['add-product-discount']}</span>%
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              {/* <div >
                                <div className="my-3 mx-2 text-left lead">
                                  <strong>Preview</strong>
                                </div>
                              </div> */}
                            </td>
                          </tr>
                        </table>
                        {(() => {

                          if (this.state["product_target_image"] == undefined || this.state["add-product-name"] == "Your Product Name." || this.state["details-added-count"] < 1) {
                            return (
                              <button type="button" data-dismiss="modal" aria-label="Close" class="btn ml-4 px-4" disabled="true" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant", "position": "absolute", "bottom": "7px", "right": "30px" }} onClick={() => {
                                this.setState({
                                  "add-details-category-id": 0,
                                })
                              }}>Submit</button>
                            )

                          } else {
                            return (
                              <button type="button" data-dismiss="modal" aria-label="Close" class="btn ml-4 px-4" style={{ "backgroundColor": "#037bff", "color": "white", "outline": "none !importatant", "position": "absolute", "bottom": "7px", "right": "30px" }} onClick={() => {
                                this.setState({
                                  "add-details-category-id": 0,
                                })
                                this.post_data_to_server();
                                this.remove_previous_details();
                              }}>Submit</button>
                            )

                          }

                        })()}

                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </thead>
          </table>
          <table class="table table-bordered table-responsive">
            <thead>

              <th scope="col" class="text-center">Product Name</th>
              <th scope="col" class="text-center">Date Added</th>
              <th scope="col" class="text-center"> Scans</th>
              <th scope="col" >Minimum Qty.</th>
              <th scope="col" >Maximum Qty</th>
              <th scope="col" class="text-center">In Stock</th>
              <th scope="col" class="text-center">Price/pc.</th>
              <th scope="col" class="text-center">Edit</th>
              <th scope="col" class="text-center">Delete</th>
              <th scope="col" class="text-center">Publish</th>

            </thead>
            <tbody>
              {(() => {
                if (this.state.search_product_name != "") {
                  return (
                    this.state.items.filter(item => String(item.ProductName).includes(this.state.search_product_name)).filter(item => String(item.Category).includes(this.state["selected_category_name"])).map(
                      (item, index) => {
                        return (
                          <tr scope="row">
                            <td>{item.ProductName}</td>
                            <td>{String(item.DateTime).split("T")[0]}</td>
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
                          <tr scope="row">
                            <td>{item.ProductName}</td>
                            <td>{String(item.DateTime).split("T")[0]}</td>
                            <td>{Math.floor(Math.random() * 10000)}</td>
                            <td>{item.MinimumQty}</td>
                            <td>{item.MaximumQty}</td>
                            <td>{item.InStock}</td>
                            <td>{item.Price}</td>
                            <td onClick={() => { this.editIterm(item,index)}}><i class="fa-solid fa-pen-to-square"></i></td>
                            <td onClick={() => { this.deleteProduct(item, index) }}><i class="fa-solid fa-trash-can"></i></td>
                            <td><i class="fa-solid fa-upload"></i></td>
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
