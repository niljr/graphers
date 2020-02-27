import React, { Component, StyleSheet } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
export default class GalleryList extends Component {
    render() {
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: this.props.img.uri }} />
                </Left>
                <Body>
                    <Text>Sankhadeep</Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>

            // <ListItem key={day.id} >
            //     <CheckBox checked={day.isChecked} onPress={() => this.handleChange(day.id)} />
            //     <Body>
            //         <Text>{day.value}</Text>
            //     </Body>
            // </ListItem>


        );
    }


}

// const styles = StyleSheet.create({
//     /* Other styles hidden to keep the example brief... */
//     thumbnail: {
//         width: 300,
//         height: 300,
//         resizeMode: "contain"
//     }
// });