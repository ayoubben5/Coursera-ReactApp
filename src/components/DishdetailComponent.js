import React,{Component} from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Label,Col,Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm,Errors} from 'react-redux-form';
    
const minLength = (len) => (val) => val && (val.length > len);
const maxLength = (len) => (val) => !val || (val.length <= len);

    function RenderDish({dish}) {
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
            
        function RenderComments({comments}){
               
                if(comments != null){
                    
                
                            return( 
                                <div className="col-12 col-md-5 m-1">
                                <h4>
                                            Comments
                                        </h4><br/>
                                        <ul className="list-unstyled">
                                        {comments.map((comment) => {
                                return(
                                       <li key={comment.id}>
                                       <p> --{comment.comment} </p> <br/>
                                       <p> {comment.author} ,{comment.date} </p>
                                       </li>
                                    );
                                    })}
                                    </ul>
                                    <CommentForm />
                                    <br/>
                                    <br/>
                                    </div>);
                                
                
                }else{
                    return(<div></div>
                    );
                }
            }
              
            
   const DishDetail = (props) => { 
        if(props.dish != null){
        
         return(
            <div className="container">
            <div className="row">
           <Breadcrumb>
               <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
               <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
           </Breadcrumb>
           <div className="col-11">
               <h3>{props.dish.name}</h3>
               <hr/>
           </div>
       </div>
            <div className="row">
            
            
             <RenderDish dish={props.dish}/>
             <RenderComments comments={props.comments}/>
             
           </div>
            </div>
            
            ); }else{
            return( <div> </div>);
         }
    }

    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                isModalOpen:false
            }
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values){
    console.log("the comment is "+JSON.stringify(values));
 alert("the comment is "+JSON.stringify(values)); }
        
        render(){
            return( <>
        
        <Button outline onClick={this.toggleModal} > 
            <span className="fa fa-pencil fa-lg" aria-hidden="true"></span> Submit Comment
        </Button>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}>
            <ModalHeader isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
                <Col md={10}>
                <Label htmlFor="rating" md={5}><strong>Rating</strong></Label>
                    <Control.select model=".rating" name="rating"
                                className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Control.select>
                </Col>
            </Row>
            <Row className="form-group">
            <Col md={10}>
            <Label htmlFor="name" md={5}><strong>Your name</strong></Label>
            <Control.text model=".name" id="name" name="name" placeholder="Your name"
                    className="form-control" 
                        validators={{
                            minLength: minLength(2),maxLength:maxLength(15)
                        }}
                    />
                <Errors
                className="text-danger"
                    model=".name"
                        show="touched"
                            messages=  {{
                                        minLength: ' Must be greater than 2 characters',
                                        maxLength: ' Must be 15 characters or less'
                                        }}
                                        />
            
            </Col>
            </Row>
            
            
            <Row className="form-group">
                <Label htmlFor="comment" md={5}><strong>Comment</strong></Label>
                <Col md={10}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                    row="6"
                    className="form-control" />
                </Col>
            </Row>
            
            <Row className="form-group">
                <Col md={5}>
                    <Button type="submit" color="primary">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i> Submit
                    </Button>
                </Col>
            </Row>
    
    
            </LocalForm>
            </ModalBody>
        </Modal>
    
    
        </>
    
            );
        }
    }



export default DishDetail;
