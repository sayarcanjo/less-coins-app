import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Input, Button, Card, Text, ListItem, Icon, Overlay, useTheme } from '@rneui/themed';
import { supabase } from '../Services/supabaseClient'; 

const MainScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { theme } = useTheme();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('despesas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) Alert.alert('Erro', 'Não foi possível buscar as despesas.');
    else setExpenses(data);
    setLoading(false);
  };

  const handleAddExpense = async () => {
    if (!description || !amount || isNaN(parseFloat(amount))) {
      Alert.alert('Atenção', 'Por favor, preencha a descrição e um valor numérico válido.');
      return;
    }
    
    
    const { data: newExpense, error } = await supabase
      .from('despesas')
      .insert({ description: description, amount: parseFloat(amount) })
      .select()
      .single(); 

    if (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a despesa.');
    } else {
      setExpenses([newExpense, ...expenses]); 
      setDescription('');
      setAmount('');
    }
  };

  const handleDeleteExpense = async (id) => {
    const { error } = await supabase
      .from('despesas')
      .delete()
      .eq('id', id);

    if (error) {
      Alert.alert('Erro', 'Não foi possível deletar a despesa.');
    } else {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  const handleOpenEditOverlay = (expense) => {
    setEditingExpense(expense);
    setIsOverlayVisible(true);
  };

  const handleSaveChanges = async () => {
    if (!editingExpense || !editingExpense.description || !editingExpense.amount || isNaN(parseFloat(editingExpense.amount))) {
      Alert.alert('Atenção', 'Os campos não podem estar vazios e o valor deve ser um número.');
      return;
    }

    const { data: updatedExpense, error } = await supabase
      .from('despesas')
      .update({ description: editingExpense.description, amount: parseFloat(editingExpense.amount) })
      .eq('id', editingExpense.id)
      .select()
      .single();

    if (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } else {
      setExpenses(
        expenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
      setIsOverlayVisible(false);
      setEditingExpense(null);
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const renderExpenseItem = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      containerStyle={styles.listItem}
      rightContent={(reset) => (
        <Button
          title="Deletar"
          onPress={() => {
            handleDeleteExpense(item.id);
            reset();
          }}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: theme.colors.error }}
        />
      )}>
      <Icon name="money" type="font-awesome" color="#ccc" />
      <ListItem.Content>
        <ListItem.Title style={styles.description}>{item.description}</ListItem.Title>
        <ListItem.Subtitle>
          R$ {item.amount.toFixed(2).replace('.', ',')}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name="edit"
        type="font-awesome"
        color={theme.colors.primary}
        onPress={() => handleOpenEditOverlay(item)}
      />
    </ListItem.Swipeable>
  );

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.inputCard}>
        <Input
          placeholder="Descrição da despesa"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          placeholder="Valor (R$)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Button 
          title="Adicionar Despesa" 
          onPress={handleAddExpense} 
          radius={"lg"}
        />
      </Card>

      <Text h4 style={styles.totalText}>
        Total Gasto: R$ {totalAmount.toFixed(2).replace('.', ',')}
      </Text>

      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      
      {editingExpense && (
        <Overlay isVisible={isOverlayVisible} onBackdropPress={() => setIsOverlayVisible(false)}>
          <View style={styles.overlayView}>
            <Text h4>Editar Despesa</Text>
            <Input
              label="Nova descrição"
              value={editingExpense?.description || ''}
              onChangeText={(text) => setEditingExpense({...editingExpense, description: text})}
            />
            <Input
              label="Novo valor (R$)"
              value={editingExpense?.amount.toString() || ''}
              onChangeText={(text) => setEditingExpense({...editingExpense, amount: text})}
              keyboardType="numeric"
            />
            <Button 
              title="Salvar Alterações" 
              onPress={handleSaveChanges} 
              radius={"lg"}
            />
          </View>
        </Overlay>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  headerTitle: { textAlign: 'center', marginBottom: 10, marginTop: 20 },
  inputCard: { borderRadius: 15, marginBottom: 20, padding: 15 },
  totalText: { textAlign: 'center', marginBottom: 15, fontWeight: 'bold' },
  listItem: { paddingVertical: 15 },
  description: { fontWeight: 'bold' },
  overlayView: { padding: 20, width: 300 },
});


export default MainScreen;