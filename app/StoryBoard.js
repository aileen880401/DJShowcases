'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

import {ORGS} from './const';
import DJTheme from './theme';

injectTapEventPlugin();

class StoryBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.parseData(this.props.data)
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(DJTheme)
        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({data: this.parseData(nextProps.data)});
    }

    getLogo(name) {
        for(let i = 0; i < ORGS.length; i++) {
            if(ORGS[i].label.indexOf(name) !== -1) {
                return './img/logo/' + ORGS[i].value + '.png';
            }
        }
        return './img/logo/default.png';
    }

    getFeature(name) {
        return './img/features/default' + Math.ceil(Math.random() * 5) + '.png';
    }

    parseData(data) {
        var ret = {};
        ret.title = data['gsx$title']['$t'];
        ret.url = data['gsx$url']['$t'];
        ret.orgen = data['gsx$authororganizationen']['$t'];
        ret.orgcn = data['gsx$authororganizationcn']['$t'];
        ret.region = data['gsx$authororganizationregion']['$t'];
        ret.cat = data['gsx$categories']['$t'];
        ret.cttregion = data['gsx$contentregion']['$t'];
        ret.ctttag = data['gsx$contenttag']['$t'];
        ret.dtsource = data['gsx$datasource']['$t'];
        ret.notes = data['gsx$editornotes']['$t'];
        ret.element = data['gsx$elementtag']['$t'];
        ret.img = data['gsx$images']['$t'];
        ret.ipdate = data['gsx$inputdate']['$t'];
        ret.lg = data['gsx$languagetag']['$t'];
        ret.logo = this.getLogo(ret.orgen);
        ret.featureImage = this.getFeature();
        ret.takeaways = data['gsx$takeaways']['$t'];
        return ret;
    }

    render() {

        return (
            <Card className='storyBoard'>

                <CardHeader
                title = {this.state.data.orgen}
                subtitle = {this.state.data.orgcn}
                className = 'titleText'
                avatar = {this.state.data.logo} />

                <CardMedia overlay={<CardTitle className = 'imgOverlay' title= {this.state.data.element} subtitle = {this.state.data.cat}/>}>
                    <img src= {this.state.data.featureImage} />
                </CardMedia>

                <CardTitle title={this.state.data.title} />
            </Card>
        );
    }
};

StoryBoard.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default StoryBoard;
