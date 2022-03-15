import React, { Component } from 'react'
import axios from 'axios';
import './CategoryCards.css'
import CategoryProducts from '../CategoryProducts/CategoryProducts';
export default class CategoryCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            new_category_name: undefined,
            new_category_type: undefined,
            show_selected_category_page_flag: false,
            selected_category_id: 0,
            selected_category_name: "category_name",

        }
    }
    componentDidMount() {
        var thisRef = this;
        axios.get('https://run.mocky.io/v3/6f72d4bd-3817-41c9-9f0e-cf6cadd4ec06')
            .then(function (response) {
                var data = JSON.stringify(response.data)
                var new_data = JSON.parse(data)
                thisRef.setState({
                    data: new_data
                })
            })

    }
    send_new_category() {
        // POST Request
        var data = this.state.data
        var new_category = {
            "category-icon": "fas fa-heartbeat",
            "category-name": this.state.new_category_name
        }
        var new_data = [...data, new_category]
        this.setState({
            data: new_data,
            new_category_name: undefined,
            new_category_type: undefined,
        })

    }
    show_dashboard(){
        this.setState({
            show_selected_category_page_flag:false,
            selected_category_id:0,
            selected_category_name:undefined,
        })
    }
    render() {
        return (

            <div>

                {(() => {
                    if (this.state.show_selected_category_page_flag == false) {
                        return (
                            <div>
                                <div className="my-5 mx-5 text-left lead">
                                    <strong>Categories</strong>
                                </div>
                                <div id="cards" className="my-5 mx-5">
                                    <button id="cards-add" class="card mx-1 my-3" data-toggle="modal" data-target="#addnewcategory" style={{ "width": "10rem" }}>
                                        <i id="card-icon" style={{ "margin-left": "40%", "margin-right": "auto" }} class="fa-solid fa-plus"></i>
                                        <div class="card-body">
                                            <h6 style={{ "text-align": "center" }} class="card-title align-self-center vertical-align">Add Category</h6>
                                        </div>
                                    </button>
                                    <div className="modal fade" data-keyboard="false" data-backdrop="static" id="addnewcategory" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content" id="guidedTour-modal">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Add Category</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body text-left">
                                                    <form onSubmit={this.submit}>
                                                        <div class="form-group">
                                                            <label for="exampleInputEmail1">Title</label>
                                                            <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category Name" value={this.state.new_category_name} onChange={(e) => {
                                                                this.setState({
                                                                    new_category_name: e.target.value
                                                                })
                                                            }} />
                                                        </div>
                                                        <div class="form-group">
                                                            <select class="form-select" onChange={(e) => {
                                                                this.setState({
                                                                    new_category_type: e.target.value
                                                                })
                                                            }}>
                                                                <option selected value="0">Categories</option>
                                                                {this.state.data.map((eachCategory) => {
                                                                    return (
                                                                        <option value={eachCategory["category-id"]}>{eachCategory["category-name"]}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <button class="btn btn-primary px-3" data-dismiss="modal" onClick={() => {
                                                            this.send_new_category()
                                                        }}>Add</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.data.map((eachCategory) => {
                                        return (
                                            <div id="category-card" class="card mx-1 my-3" style={{ "width": "10rem", "height": "auto" }} onClick={() => {
                                                var selected_category_id = eachCategory["category-id"]
                                                var show_selected_category_name = eachCategory["category-name"]
                                                this.setState({
                                                    "selected_category_id": selected_category_id,
                                                    "selected_category_name": show_selected_category_name,
                                                    "show_selected_category_page_flag": true
                                                })
                                            }}>
                                                {/* <img class="card-img-top" src="..." alt="Card image cap" /> */}
                                                <i id="card-icon" class={eachCategory["category-icon"]}></i>
                                                <div class="card-body">
                                                    <h5 class="card-title align-self-center vertical-align">{eachCategory["category-name"]}</h5>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <CategoryProducts
                                    selected_category_name={this.state.selected_category_name}
                                    show_dashboard={this.show_dashboard.bind(this)}
                                ></CategoryProducts>
                            </div>
                        )
                    }
                })()}


                {/* {alert(this.state.new_category_name)}
                {alert(this.state.new_category_type)} */}
            </div>
        )
    }
}