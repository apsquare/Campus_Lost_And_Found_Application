import { createContext, useContext, useMemo, useState } from "react";
import { adminCredential, mockItems } from "../data/mockData";
import usnCsv from "./usn.csv?raw";

const AppContext = createContext();

function parseStudentsFromCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const rows = lines.slice(1);

  return rows
    .map((line) => {
      const [usn, name] = line.split(",");

      return {
        usn: usn?.trim().toUpperCase(),
        name: name?.trim(),
        score: 0,
        successfulReturns: 0,
      };
    })
    .filter((student) => student.usn && student.name);
}

const csvStudents = parseStudentsFromCsv(usnCsv);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState(mockItems);
  const [studentScores, setStudentScores] = useState(csvStudents);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        message,
        read: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
  };

  const login = ({ loginId, password }) => {
    const cleanLoginId = loginId.trim().toUpperCase();

    if (
      cleanLoginId === adminCredential.username.toUpperCase() &&
      password === adminCredential.password
    ) {
      setUser(adminCredential);
      return { success: true, role: "admin" };
    }

    const student = studentScores.find(
      (student) => student.usn === cleanLoginId,
    );

    if (!student) {
      return {
        success: false,
        message: "This USN is not present in the uploaded CSV file.",
      };
    }

    setUser({
      ...student,
      id: student.usn,
      role: "student",
    });

    return { success: true, role: "student" };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const markNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const addLostItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      type: "lost",
      status: "Lost",
      messages: [],
      reporterName: user?.name || "Student",
      reporterUsn: user?.usn || "",
      rewardPaid: false,
      paymentRequested: false,
      returnedByUsn: "",
      contactedByUsn: "",
      contactedByName: "",
    };

    setItems((prev) => [item, ...prev]);
    addNotification(`${item.reporterName} posted a lost item: ${item.title}`);
  };

  const addFoundItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      type: "found",
      status: "Found",
      messages: [],
      reporterName: user?.name || "Student",
      reporterUsn: user?.usn || "",
      rewardPaid: false,
      paymentRequested: false,
      returnedByUsn: "",
      contactedByUsn: "",
      contactedByName: "",
    };

    setItems((prev) => [item, ...prev]);
    addNotification(`${item.reporterName} posted a found item: ${item.title}`);
  };

  const requestPayment = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, paymentRequested: true } : item,
      ),
    );
  };

  const completePayment = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rewardPaid: true } : item,
      ),
    );
  };

  const markResolved = (id) => {
    const item = items.find((currentItem) => currentItem.id === id);

    if (!item || item.status === "Resolved") return;

    if (item.rewardOffered && !item.rewardPaid) {
      requestPayment(id);
      return;
    }

    const helperUsn = item.contactedByUsn;

    if (!helperUsn) {
      addNotification("No helper found. Someone must contact first.");
      return;
    }

    setItems((prev) =>
      prev.map((currentItem) =>
        currentItem.id === id
          ? {
              ...currentItem,
              status: "Resolved",
              type: "resolved",
              returnedByUsn: helperUsn,
            }
          : currentItem,
      ),
    );

    setStudentScores((prev) =>
      prev.map((student) =>
        student.usn === helperUsn
          ? {
              ...student,
              score: student.score + 5,
              successfulReturns: student.successfulReturns + 1,
            }
          : student,
      ),
    );

    addNotification(`${item.title} has been resolved successfully.`);
  };

  const sendMessage = (itemId, sender, text, image = "") => {
    if (!text.trim() && !image) return;

    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;

        const isContactingPerson =
          user?.role === "student" && user?.usn !== item.reporterUsn;

        return {
          ...item,
          contactedByUsn: isContactingPerson
            ? user.usn
            : item.contactedByUsn || "",
          contactedByName: isContactingPerson
            ? user.name
            : item.contactedByName || "",
          messages: [
            ...item.messages,
            {
              id: Date.now(),
              sender,
              senderUsn: user?.usn || "",
              senderName: user?.name || sender,
              text,
              image,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      }),
    );
  };

  const currentUserData =
    user?.role === "student"
      ? studentScores.find((student) => student.usn === user.usn)
      : null;

  const leaderboard = [...studentScores]
    .sort((a, b) => b.score - a.score)
    .filter((student) => student.score > 0);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      items,
      addLostItem,
      addFoundItem,
      markResolved,
      sendMessage,
      currentUserData,
      studentScores,
      leaderboard,
      notifications,
      markNotificationsRead,
      theme,
      toggleTheme,
      requestPayment,
      completePayment,
    }),
    [user, items, studentScores, notifications, theme],
  );

  return (
    <AppContext.Provider value={value}>
      <div data-theme={theme}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
