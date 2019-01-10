import React, {Component} from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ComponentTypes.css';


class ComponentTypes extends Component {

    render() {

        if (!this.props.componentTypes || !this.props.componentCounter) {
            return null;
        }

        const componentTypes = this.props.componentTypes.map((componentType, index) =>
            <span key={componentType}>
                {index > 0 && <span className="line"> </span>}
                <CircularProgressbar className="CircularProgressbar"
                                     percentage={this.props.componentCounter[componentType] && (this.props.componentCounter[componentType] > 0) ? 100 : 0}
                                     textForPercentage={() => componentType}
                />
            </span>
        );

        return (
            <div className="ComponentTypes">
                {componentTypes}
            </div>
        );
    }
}


export default ComponentTypes;