import React, { Component } from 'react'

import axios from 'axios'

class Table extends Component {
	constructor() {
		super()

		this.state = {
			response: []
		}

		this.showModal = this.showModal.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	closeModal() {
		this.setState({
			index: null
		})
	}

	showModal(event) {
		const index = event.target.getAttribute('data-index')

		console.log(index)

		this.setState({
			index
		})
	}

	componentDidMount() {
		setInterval(this.fetchData, 5000)
	}

	fetchData() {
		axios.get('http://localhost:12121/all-data').then(response => {
			console.log(response.data)
			this.setState({
				response: response.data.map(item => {
					return JSON.parse(item)
				})
			})
		})
	}

	renderRows() {
		const { response } = this.state
		console.log(response)

		return response.map((item, index) => {
			console.log(item)
			return (
				<div className='item' key={item.timestamp} data-index={index} onClick={this.showModal}>
					{new Date(item.timestamp).toLocaleTimeString()}
				</div>
			)
		})
	}

	renderPrettified() {
		const { index, response } = this.state

		if (index) {
			return (
				<div className='full-screen'>
					
					<textarea>{JSON.stringify(response[index], '\t', 4)}</textarea>
					<div className='close-icon' onClick={this.closeModal}>
						Close
					</div>
				</div>
			)
		} else {
			return null
		}
	}

	render() {
		return (
			<div className='container'>
				{this.renderRows()}
				{this.renderPrettified()}
			</div>
		)
	}
}

export default Table
