import React ,{Component} from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail  from './DishdetailComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import About from './AboutComponent';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback, fetchFeedbacks } from '../redux/ActionCreators';
import {actions} from 'react-redux-form'; 
import {TransitionGroup,CSSTransition} from 'react-transition-group';
const mapDispatchToProps = (dispatch) => ({
     postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
     postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
     fetchDishes: () => {dispatch(fetchDishes())},
     resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
     fetchComments: () => {dispatch(fetchComments())},
     fetchFeedbacks: () => {dispatch(fetchFeedbacks())},
     fetchPromos: () => {dispatch(fetchPromos())},
     fetchLeaders: () => {dispatch(fetchLeaders())}
});




const mapStateToProps = state =>{
    return {
      dishes:state.dishes,
      comments:state.comments,
      promotions:state.promotions,
      leaders:state.leaders
    }
}



class Main extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }
  
    render(){
      const HomePage = () =>{
        return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess ={this.props.dishes.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess ={this.props.leaders.errMess}
            promo={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMess ={this.props.promotions.errMess}
          />
        )
      }
      const DishWithId = ({match}) =>{
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess ={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId,10))}
              postComment={this.props.postComment}
              commentsErrMess ={this.props.comments.errMess}
            />
        );
      }
  return (
    <div>
      <Header/>
      <TransitionGroup>
      <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
      <Switch> 
       <Route path="/home" component={HomePage}/>
       <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
       <Route path="/menu/:dishId" component={DishWithId}/>
       <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
       <Route  exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
       <Redirect to="/home"/>
      </Switch> 
      </CSSTransition>
      </TransitionGroup>
      <Footer/> 
    </div>
  );}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
