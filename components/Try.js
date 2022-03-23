import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import db, { auth, provider, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Try = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [list, setList] = useState({});
  const [fileList, setFileList] = useState({});

  const sendToDb = (e) => {
    db.collection("personel").add({
      name: name,
      surName: surName,
    });
    setName("");
    setSurName("");
  };

  useEffect(() => {
    db.collection("personel").onSnapshot((ss) => {
      setList(
        ss.docs.map((person) => {
          return { id: person.id, data: person.data() };
        })
      );
    });

    db.collection("pics").onSnapshot((ss) => {
      setFileList(
        ss.docs.map((file) => {
          return { id: file.id, data: file.data() };
        })
      );
    });
  }, []);


  const deleteDoc = (personId) => {
    db.collection("personel").doc(personId).delete();
  };

  const deleteCollection = () => {
    list.forEach((li) => {
      deleteDoc(li.id);
    });
  };

  const updateDoc = (personId) => {
    db.collection("personel").doc(personId).update({
      name: updateName,
      surName: updateSurName,
    });
    setUpdateName("");
    setUpdateSurName("");
    setModal(false);
  };

  // store

  const [progress, setProgress] = useState(0);

  const addFile = (file) => {
    if (file) {
      const storageRef = ref(storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // console.log(url);

            db.collection("pics").add({
              img: url,
              name: file.name,
            });
          });
        }
      );
    } else {
      return;
    }
  };

  const deleteFile = (id, name) => {
    const desertRef = ref(storage, name);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

    db.collection("pics").doc(id).delete();
  };

  const deleteAllFiles = () => {
    fileList.forEach((li) => {
      deleteFile(li.id, li.data.name);
    });
  };

  return (
    <div className="bg-iceWhite w-96 mt-8">
      <button
        onClick={() => {
          db.collection("personel").add(data);
          console.log("ok");
        }}
      >
        button
      </button>
    </div>
  );
};

export default Try;