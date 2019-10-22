import React from 'react';
import ReactPlayer from 'react-player';
import './beat_styles.css'

import cart from '../icons/cart.png'
import success from '../icons/success.png'
import {BeatWrapper} from "./beat_styled";

function containsObj(obj, list){
    for (let i = 0; i < list.length; i++) {
        if (list[i].name === obj.name) {
            return true;
        }
    }

    return false;
}

class Beat extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cartIcon: cart,
        }

    }

    componentDidMount() {
        let cart = JSON.parse(localStorage.getItem('Cart')) || [];
        if(containsObj({beat: this.props.beat.file,
            name: this.props.beat.name,
            price: this.props.beat.price}, cart)) {
            this.setState({
                cartIcon: success
            })
        }
    }

    addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('Cart')) || [];
        if(!containsObj({beat: this.props.beat.file,
            name: this.props.beat.name,
            price: this.props.beat.price}, cart)) {
            cart.push({
                beat: this.props.beat.file,
                name: this.props.beat.name,
                price: this.props.beat.price,
            });
            this.setState({
                cartIcon: success,
            })
        }
        localStorage.setItem('Cart', JSON.stringify(cart));
    };

    render() {
        return (
            <BeatWrapper index={(this.props.index + 1) + 's'}>
                <p className='beat_name'>{this.props.beat.name}</p>
                <div className='player'>
                    <ReactPlayer height={10} style={{height:0}} controls={true} url={this.props.beat.file}
                        config={{ file: {
                            attributes: {
                                controlsList: 'nodownload'
                            }
                        }}}
                    />
                    <img className='addToCart' onClick={this.addToCart} src={this.state.cartIcon} alt='cart_icon'/>
                </div>
                <div className='more_info'>
                    <p className='artist'>Artist: {this.props.beat.artist}</p>
                    <p className='price'>Price: ${this.props.beat.price}</p>
                </div>
            </BeatWrapper>
        )
    }
}

export default Beat;