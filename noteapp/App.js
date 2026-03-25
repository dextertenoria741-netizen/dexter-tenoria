import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const selectNote = (index) => {
    setNote(notes[index]);
    setSelectedIndex(index);
    setEditMode(true);
  };

  const updateNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedIndex] = note;
    setNotes(updatedNotes);
    setNote("");
    setEditMode(false);
  };

  const cancelEdit = () => {
    setNote("");
    setEditMode(false);
  };

  const openDeleteModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const deleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== selectedIndex);
    setNotes(newNotes);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>

      {/* Input and edit buttons in one row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a note..."
          placeholderTextColor="#ccc"
          value={note}
          onChangeText={setNote}
        />

        {editMode && (
          <View style={styles.editButtonsRight}>
            <TouchableOpacity style={styles.updateBtn} onPress={updateNote}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn2} onPress={cancelEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!editMode && (
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => selectNote(index)}
            onLongPress={() => openDeleteModal(index)}
          >
            <Text style={styles.noteText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Note</Text>
            <Text style={styles.modalText}>
              Do you want to delete this note?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteBtn} onPress={deleteNote}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#E0F7FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#006064",
    textAlign: "center",
  },

  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#00ACC1",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#B2EBF2",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },

  editButtonsRight: { marginLeft: 10, justifyContent: "flex-start" },

  updateBtn: {
    backgroundColor: "#0072C6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  cancelBtn2: {
    backgroundColor: "#00B050",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  buttonText: { color: "white", fontWeight: "bold", fontSize: 14 },

  button: {
    backgroundColor: "#0072C6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#0072C6",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    marginBottom: 10,
  },

  note: {
    padding: 15,
    backgroundColor: "#B2EBF2",
    marginTop: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },

  noteText: { fontSize: 16, color: "#006064" },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 300,
    backgroundColor: "#000",
    padding: 25,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: "#000000",
    paddingVertical: 5,
    borderRadius: 5,
  },
  modalText: {
    color: "#fff",
    backgroundColor: "#000000",
    padding: 8,
    borderRadius: 5,
    marginBottom: 25,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#252222",
  },
  cancelText: { color: "white", fontWeight: "bold", fontSize: 16 },
  deleteBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#252222",
  },
  deleteText: { color: "red", fontWeight: "bold", fontSize: 16 },
});