import React from 'react';
import { string, func, number, bool } from "prop-types";
import CountUp from 'react-countup';

import classnames from "classnames";

import classes from "./UserWidget.less";

class UserWidget extends React.Component {
	static propTypes = {
		coins: number,
		imgSrc: string,
		lootBoxShow: func,
		name: string,
		onProfileShow: func,
		profilePage: bool
	}

	state = {
		startCoins: 0,
		endCoins: 0,
		onProgress: false
	}

	componentDidMount() {
		if (this.props.coins) {
			this.setState({
				endCoins: this.props.coins
			});
		}
	}

	componentDidUpdate() {
		if (this.props.coins && this.state.endCoins !== this.props.coins) {
			this.setState({
				endCoins: this.props.coins
			});
		}
	}

	onEndHandle = () => {
		this.setState({
			startCoins: this.state.endCoins,
			onProgress: false
		});
	}

	onStartHandle = () => {
		this.setState({
			onProgress: true
		});
	}

	onAvatarClick = () => {
		if (!this.props.profilePage) {
			this.props.onProfileShow();
		}
	}

	onLootBoxShowClick = () => {
		if (!this.props.profilePage) {
			this.props.lootBoxShow();
		}
	}

	render() {
		const { imgSrc, name, profilePage } = this.props;

		const { startCoins, endCoins, onProgress } = this.state;

		const userWidgetClasses = classnames({
			[classes.userWidget]: true,
			[classes.userWidgetProfilePage]: profilePage
		});


		return (
			<div className={userWidgetClasses}>
				<div onClick={this.onAvatarClick} className={classes.userWidgetImageWrapper}>
					<div className={classes.userWidgetImageContainer}>
						<img className={classes.userWidgetImage} src={imgSrc} alt="" />
					</div>
				</div>
				<div onClick={this.onLootBoxShowClick}>
					<div className={classes.userWidgetCoinWrapper}>
						<div className={classes.userWidgetCoinContainer}>
							<p className={onProgress ? `${classes.userWidgetAddBlur} ${classes.userWidgetCoin}` : classes.userWidgetCoin}>coins:
								{ endCoins && (startCoins !== endCoins) ?
									<CountUp
										start={startCoins}
										end={endCoins}
										duration={5}
										delay={1}
										onStart={this.onStartHandle}
										onEnd={this.onEndHandle}
									/>
									:
									endCoins
								}
							</p>
						</div>
					</div>
					<div className={classes.userWidgetNameWrapper}>
						<div className={classes.userWidgetNameContainer}>
							<p className={classes.userWidgetName}>{ name }</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserWidget;
