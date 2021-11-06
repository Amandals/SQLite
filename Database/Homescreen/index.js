import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Button } from 'react-native';  
import { TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = () => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  let register_user = () => {
    db.transaction(function (tx) {
        tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        ["userName", "userContact", "userAddress"],
        (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
                console.log("coluna adicionada");
            } else console.log('Registration Failed');
        }
        );
    }); 
    }

// fazer a função de retornar a tabela. 
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
            setFlatListItems(temp);
            }
        );
        });
    }, []);

    let listViewItemSeparator = () => {
        return (
          <View
            style={{
              height: 0.2,
              width: '100%',
              backgroundColor: '#808080'
            }}
          />
        );
      };

    let listItemView = (item) => {
        return (
          <View
            key={item.user_id}
            style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Id: {item.user_id}</Text>
            <Text>Name: {item.user_name}</Text>
            <Text>Contact: {item.user_contact}</Text>
            <Text>Address: {item.user_address}</Text>
          </View>
        );
      };

//deletar um item da tabela
let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('apagado com sucesso');
          } else {
            console.log('Please insert a valid User Id');
          }
        }
      );
    });
  };

//deletar a tabela inteira
//upadate - editar

    return ( 
        <View style={{flex: 1, backgroundColor: '#64CAD9'}}>
        <View style={{height: 120 , backgroundColor: '#64CAD9'}}></View>
        <View style={{flex: 1, backgroundColor: '#214E88'}}></View> 
            <Text> Efetuando teste do via circulacao  </Text>
            <Text> Efetuando teste do escada nome  </Text>

    
        <Button //botão que chama a funcao ir para a pg inspecao externa 1
        title="Fazer o teste de criação - homescreen"
        onPress={ HomeScreen }
        />

        <Button //botão que chama a funcao ir para a pg inspecao externa 1
        title="Fazer o teste de registro"
        onPress={ register_user }
        />

        <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
        />

        <TextInput placeholder="insira o id" onChangeText={
            (inputUserId) => setInputUserId(inputUserId)
        } />
        <Button //botão que chama a funcao ir para a pg inspecao externa 1
        title="Deletar usuario"
        onPress={ deleteUser }
        />

        <View style={{height: 120, backgroundColor: '#64CAD9'}}></View>
        </View>
    );
};

export default HomeScreen;