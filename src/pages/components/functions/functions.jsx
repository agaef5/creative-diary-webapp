import { useEffect, useState } from "react";
import { database } from "../../../../firebase-config";
import { ref, onValue } from "firebase/database";

// coded by Aga
export function GetUser(userId) {
    const [user, setUser] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const userRef = ref(database, `users/${userId}`);
  
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
  
          if (data) {
            setUser(data);
          }
        });
      };
      fetchData();
    }, [userId]);
  
    return user;
  }


