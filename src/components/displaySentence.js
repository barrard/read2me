import React from 'react';
import styled from 'styled-components'
import {sentenceData} from '../data/sentenceData'

class Sentence extends React.Component {
	constructor(props) {
		super()
		this.state = {
			sentences: sentenceData,
			currentSentence: [],
			currentWord: '',
			currentWordIndex: 0,
			isListening: false,
			isSoundHeard: false
		}
		this.listenForVoice = this.listenForVoice.bind(this)
	}
	componentDidMount() {
		console.log(this.state.sentences)
		if(!this.state.sentences) return
		let words = this.state.sentences[0].split(' ')
		this.setState({
			currentSentence: words,
			currentWord: words[this.state.currentWordIndex]
		})
	}
	listenForVoice() {
		if (!this.state.isListening) {
			this.setState({ isListening: true })

			// console.log('listenignnnansdfnasdnfasnd');

			window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
			const recognition = new window.SpeechRecognition();

			console.log(recognition);
			// recognition.continuous = true
			recognition.interimResults = true
			recognition.maxAlternatives = 2
			recognition.onresult = (event) => {

				const speechToText = event.results[0][0].transcript;

				console.log(speechToText);
				if (speechToText.toLowerCase().includes( this.state.currentWord.toLowerCase())) {
					console.log('got a match');
					const index = this.state.currentWordIndex +1
					this.setState({
						currentWordIndex:  index,
						currentWord:this.state.currentSentence[index]
					})
					console.log({ currentWord:this.state.currentWord,currentWordIndex:this.state.currentWordIndex})


				}

			}
			recognition.onstart = (event) => {
				// console.log('onstart')

			}
			recognition.onend = (event) => {
				// console.log('onend');

				recognition.start();
			}
			recognition.onsoundstart = (event) => {
				// console.log('onsoundstart', 'random noise')

			}
			recognition.onspeechstart = (event) => {
				// console.log('onspeechstart', 'recognizing speach ')
				this.setState({ isSoundHeard: true })
			}
			recognition.onspeechend = (event) => {
				// recognition.start();
				// console.log('onspeechend' , event)
				this.setState({ isSoundHeard: false })
			}
			recognition.onnomatch = (event) => {
				console.log('onnomatch')

			}

			recognition.start();
		}


	}
	render() {
		return (
			<>
				<button onClick={this.listenForVoice}>listen</button>
				{/* <p>{this.state.currentSentence}</p> */}
				<SentenceFlow sentence={this.state.currentSentence} currentWordIndex={this.state.currentWordIndex} />
				<div className="circle"></div>
				<ListeningIndicator isListening={this.state.isListening} />
				<SoundIndicator isSoundHeard={this.state.isSoundHeard}>
				</SoundIndicator>
			</>
		)
	}
}
export default Sentence

const SentenceFlow = ({ sentence, currentWordIndex }) => {
	console.log({sentence});

	// const currentWordIndex = sentence.indexOf(currentWord)
	// console.log({currentWordIndex,sentence});
	// sentence.filter(name => name === 'name')
	return (
		<div>
			<p>
				{sentence.map((word, i) => {
					let isCurrentWord = i === currentWordIndex ? 'highlighted' : ''
					return <span className={isCurrentWord} key={i}> {word} </span>
				})}
			</p>
		</div>
	)
}

const ListeningIndicator = styled.div`
	width: 1.5em;
	height: 1.5em;
	border-radius:50%;
	background: ${(props) => props.isListening ? 'red' : 'green'};
`
const SoundIndicator = styled.div`
	width: 1.5em;
	height: 1.5em;
	border-radius:50%;
	background: ${(props) => props.isSoundHeard ? 'red' : 'green'};
`