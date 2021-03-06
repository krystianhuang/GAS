import React from "react";
import "./App.css";
import SignInSide from "../src/loginPage";
import RegisterSide from "../src/Register";
import EnhancedTable from "../src/viewStudentInfo";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Header from "../src/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StudentPreferences from './StudentPreferences';
import StudentData from './studentData';
import StudentGroup from './studentGroup';
import Dashboard from './StudentDashboard';
import Info from './Info';
import {userContext} from './userContext';
import {createBrowserHistory} from "history";
import {CookiesProvider} from 'react-cookie';
import { withCookies, Cookies } from 'react-cookie';

const history = createBrowserHistory();

class App extends React.Component {
	constructor(props) {
		super(props);
		const user = this.props.cookies.get('currentUser');
		this.state = {
			user: user? user: {},
		};
	}

	setUser = (user) => {
		if(user) {
			this.setState({user});
			this.props.cookies.set('currentUser', JSON.stringify(user), { path: '/' });
		}
	}

	render() {
		const value = {
			user: this.state.user,
			setUser: this.setUser,
		}

		return (
			<CookiesProvider>
				<userContext.Provider value={value}>
					<div className="App">
						<BrowserRouter history={history}>
							<Switch>
								<Route path="/loginPage" component={SignInSide}/>
								<Route path="/register" component={RegisterSide}/>
								<Route path="/viewStudentInfo" component={EnhancedTable}/>
								<Route path="/studentData" component={StudentData}/>
								<Route path="/StudentDashboard" component={Dashboard}/>
								<Route path="/StuInfo" component={Info}/>
								<Route path="/StudentPreferences" component={StudentPreferences}/>
								<Route path="/studentGroup" component={StudentGroup}/>
								<Route exact path="/" component={Home}>
                <Header />
                <Home />
              </Route>
							</Switch>
						</BrowserRouter>
						<ToastContainer/>
					</div>
				</userContext.Provider>
			</CookiesProvider>
		);
	}
}

export default withCookies(App);
