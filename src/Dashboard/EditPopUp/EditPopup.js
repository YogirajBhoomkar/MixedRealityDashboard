import React, { Component } from 'react'
import './EditPopup.CSS'
export default class EditPopup extends Component {
  render() {
    return (
        <div class="modal fade bd-example-modal-lg" data-keyboard="false" data-backdrop="static" id="editItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content" id="guidedTour-modal">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Item</h5>
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
                                                                <input class="form-control mx-2 w-75" type="number" min={0} max={100} step={1} placeholder="Enter maximum quantity" value={this.state.new_category_name} onChange={(e) => {
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
                                    {(() => {
                                        if (this.state.screenCount == 6) {
                                            return (
                                                <button type="button" data-dismiss="modal" aria-label="Close" class="btn mt-5" style={{ "margin-left": "-20px", "backgroundColor": "#007FFF", "color": "white", "borderRadius": "10px", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "paddingLeft": "40px", "paddingRight": "40px" }} onClick={() => {
                                                    this.setState({
                                                        screenCount: 0,
                                                    })
                                                    this.post_data_to_server();
                                                    this.remove_previous_details();
                                                }}>Submit</button>
                                            )
                                        }
                                        else if (this.state.screenCount < 6) {
                                            return (
                                                <button type="button" class="btn mt-5" style={{ "margin-left": "-20px", "backgroundColor": "#007FFF", "color": "white", "borderRadius": "10px", "outline": "none", "font-family": "Poppins, sans-serif", "fontWeight": "bold", "fontSize": "17px", "paddingLeft": "30px", "paddingRight": "30px" }} onClick={() => {
                                                    var count = this.state.screenCount
                                                    count = count + 1
                                                    this.setState({
                                                        screenCount: count,
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
                                                    <span className='ml-2'>Price: </span><span>{this.state['add-product-price']}</span>%
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
    )
  }
}
