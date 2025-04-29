// app/UserTable.jsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserTable() {
  const { userList } = useLocalSearchParams();
  const parsedUserList = JSON.parse(decodeURIComponent(userList));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Users</Text>

      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.row}>
            <Text style={styles.headerCell}>Sl. No.</Text>
            <Text style={styles.headerCell}>Username</Text>
            <Text style={styles.headerCell}>Email ID</Text>
            <Text style={styles.headerCell}>Phone No</Text>
            <Text style={styles.headerCell}>Address</Text>
            <Text style={styles.headerCell}>DOB</Text>
          </View>

          {/* Table Rows */}
          {parsedUserList.map((user, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.dataCell}>{index + 1}</Text>
              <Text style={styles.dataCell}>{user.name}</Text>
              <Text style={styles.dataCell}>{user.email}</Text>
              <Text style={styles.dataCell}>{user.phone}</Text>
              <Text style={styles.dataCell}>{user.address}</Text>
              <Text style={styles.dataCell}>{user.dob}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const cellWidth = 180; // Wider cells for better alignment

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#003f88',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  headerCell: {
    backgroundColor: '#003f88',
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fff',
    width: cellWidth,
    textAlign: 'center',
  },
  dataCell: {
    backgroundColor: '#e6f0ff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#003f88',
    width: cellWidth,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
