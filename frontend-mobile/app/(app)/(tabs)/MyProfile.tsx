import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BookList from "@/components/common/BookList";
import { ProfileHeader } from "@/components/common/ProfileHeader";
import ProfileTabs from "@/components/common/ProfileTabs";
import { useBorrowedBooks, useLentBooks, useMyBooks } from "@/hooks/books";
import { useMyProfile } from "@/hooks/user";

const ProfileScreen = () => {
  type TabType = "list" | "borrowed" | "lent";

  const [activeTab, setActiveTab] = useState<TabType>("list");

  const { data: user } = useMyProfile();

  const { data: userBooks = [] } = useMyBooks();

  const { data: borrowedBooks = [] } = useBorrowedBooks();

  const { data: lentBooks = [] } = useLentBooks();

  //   console.log("My Books:", userBooks);
  // console.log("Borrowed Books:", borrowedBooks);
  // console.log("Lent Books:", lentBooks);

  const currentData =
    activeTab === "list"
      ? userBooks
      : activeTab === "borrowed"
        ? borrowedBooks
        : lentBooks;

  console.log("activeTab: ", activeTab);

  return (
    <SafeAreaView className="flex-1">
      <ProfileHeader user={user} bookNo={userBooks?.length ?? 0} />

      <ProfileTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        // onAddPress={() => setModalVisible(true)}
      />

      <BookList
        data={currentData}
        // returnBook={returnBook}
        // calculateDaysSinceAdded={calculateDaysSinceAdded}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useRouter } from "expo-router";
// import moment from "moment";

// import AppText from "@/components/common/AppText";
// import { Book, UserBook } from "@/types/book";
// import { User } from "@/types/user";
// import { api } from "@/utils/api";
// import StatusBar from "@/components/common/StatusBar";
// import { Colors } from "@/constants/Colors";

// const ProfileScreen = () => {
//   const route = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("list");
//   const [bookCollection, setBookCollection] = useState<Book[]>([]); // Array of books
//   const [lentBooks, setLentBooks] = useState<Book[]>([]); // Array of lent books
//   const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]); // Array of borrowed books
//   const [friendsNo, setFriendsNo] = useState<number | undefined>(); // Friends count (number or undefined)
//   const [bookNo, setBookNo] = useState<number>(0); // Book count (defaults to 0)
//   // const [user, setUser] = useState<User>();
//   const [userBook, setUserBook] = useState<UserBook>();

//   // const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });
//   // const queryClient = useQueryClient();

//   // useEffect(() => {
//   //   if (authUser) {
//   //     setUser(authUser);
//   //     console.log("authUser", user?.username);
//   //   }
//   // }, [authUser]);

//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["me"],
//     queryFn: async () => {
//       const res = await api.get<User>("/user/me");
//       return res.data;
//     },
//   });

//   // useEffect(() => {
//   //   console.log("ue user", user?.username); // Log user whenever it changes
//   // }, [user]);

//   useEffect(() => {
//     // getMe();
//     // getBookCollection();
//     getLentBook();
//     getBorrowedBook();
//   }, []);

//   // const getBookCollection = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const res = await api.get("/book/me");
//   //     const data: UserBook[] = res.data;
//   //     console.log(
//   //       "bc current book data: ",
//   //       data.map((books) => books.title),
//   //     );
//   //     setBookNo(res.data.bookCollection.length);
//   //     setBookCollection(data);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     setLoading(false);
//   //     console.error(error);
//   //   }
//   // };

//   const getLentBook = async () => {
//     try {
//       const res = await api.get("/books/lentBooks");
//       const data: Book[] = res.data;
//       console.log(
//         "current lent data: ",
//         data.map((books) => books.title),
//       );
//       setLentBooks(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getBorrowedBook = async () => {
//     try {
//       const res = await api.get("/books/borrowedBooks");
//       const data: Book[] = res.data;
//       console.log(
//         "current borrowed book title: ",
//         data.map((books) => books.title),
//       );
//       setBorrowedBooks(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // const returnBook = async (bookId: string) => {
//   //   try {
//   //     console.log("bookId", bookId);
//   //     const res = await api.put("/books/returnBook", { bookId });
//   //     console.log("res book data: ", res.data.title);
//   //     await getBookCollection();
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   useEffect(() => {
//     console.log(
//       "Updated book collection:",
//       bookCollection.map((books) => books.title),
//     );
//   }, [bookCollection, lentBooks, borrowedBooks, activeTab]);

//   const calculateDaysSinceAdded = (bookAddedDate: moment.MomentInput) => {
//     if (!bookAddedDate) return "Unknown date"; // Handle missing dates
//     const addedDate = moment(bookAddedDate);
//     if (!addedDate.isValid()) return "Invalid date"; // Handle invalid dates
//     const today = moment();
//     const daysPassed = today.diff(addedDate, "days");
//     return daysPassed > 0 ? `${daysPassed} days ago` : "Today";
//   };

//   const renderBookItem = ({ item }: { item: Book }) => (
//     <View className="flex-row items-center py-3 border-b border-primary">
//       <View className="w-12.5 h-18.75 rounded-md mr-3 border border-primary bg-gray-200" />

//       <TouchableOpacity
//         className="flex-1"
//         onPress={() =>
//           router.push({
//             pathname: "/book/detail/[bookId]",
//             params: { bookId: item._id },
//           })
//         }
//       >
//         <AppText className="text-base font-semibold">{item.book.title}</AppText>

//         <AppText className="text-sm">{item.book.author.join(", ")}</AppText>

//         {item.bookType !== "myBook" &&
//           (item.bookType === "lent" || item.bookType === "lentBook" ? (
//             <AppText className="text-xs mt-1">
//               Lent {calculateDaysSinceAdded(item.bookAdded)}
//             </AppText>
//           ) : item.bookType === "borrow" || item.bookType === "borrowedBook" ? (
//             <AppText className="text-xs mt-1">
//               Borrowed {calculateDaysSinceAdded(item.bookAdded)}
//             </AppText>
//           ) : null)}
//       </TouchableOpacity>

//       {item.bookType !== "myBook" &&
//         (item.bookType === "lent" || item.bookType === "lentBook" ? (
//           <TouchableOpacity className="bg-primary px-3 py-2 rounded-lg">
//             <AppText className="text-background font-bold">Ask Back</AppText>
//           </TouchableOpacity>
//         ) : item.bookType === "borrow" || item.bookType === "borrowedBook" ? (
//           <TouchableOpacity
//             className="bg-primary px-3 py-2 rounded-lg"
//             onPress={() => returnBook(item._id)}
//           >
//             <AppText className="text-background font-bold">Return</AppText>
//           </TouchableOpacity>
//         ) : null)}
//     </View>
//   );

//   const [isModalVisible, setModalVisible] = useState(false);
//   const router = useRouter();

//   const openModal = () => setModalVisible(true);
//   const closeModal = () => setModalVisible(false);

//   const handleOptionPress = (route: string) => {
//     setModalVisible(false);
//     router.push(route);
//   };

//   const getTabStyle = (tab: string) =>
//     activeTab === tab
//       ? "mb-1 font-bold text-selection"
//       : "mb-1 text-background";

//   return (
//     <SafeAreaView className="flex-1">
//       {/** Header */}
//       <View className="bg-primary flex-row justify-between p-2 px-4">
//         <TouchableOpacity onPress={router.back}>
//           <Ionicons name="return-up-back" size={28} color="white" />
//         </TouchableOpacity>

//         <Text className="font-bold text-text-dark text-2xl">
//           @{user?.username}
//         </Text>

//         <TouchableOpacity>
//           <Ionicons name="chatbubbles-outline" size={28} color="white" />
//         </TouchableOpacity>
//       </View>
//       <View className="justify-between p-2 px-4">
//         {/* Profile Section */}
//         {/* Image */}
//         <View className="flex-row items-center w-full">
//           <View className="mt-2 border border-primary rounded-full overflow-hidden mb-2">
//             <Image
//               source={{ uri: "https://example.com/profile-pic.jpg" }}
//               className="w-24 h-24"
//             />
//           </View>
//           {/** Book and Friends */}
//           <View className="flex-row justify-end w-[70%] mt-2 mr-2">
//             <View className="items-center justify-center mx-2 py-2 px-5">
//               <AppText className="text-lg font-bold text-text-light">
//                 {bookNo}
//               </AppText>
//               <AppText className="text-lg text-text-light">Books</AppText>
//             </View>

//             <TouchableOpacity className="items-center justify-center mx-2 py-2 px-5">
//               <AppText className="text-lg font-bold text-text-light">
//                 0{friendsNo}
//               </AppText>

//               <AppText
//                 className="text-lg text-text-light"
//                 onPress={() => router.push("../friends/MyFriendlist")}
//               >
//                 Friends
//               </AppText>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Edit Button */}
//         <View className="items-end">
//           <TouchableOpacity
//             className="absolute top-12 py-1.5 px-6 bg-primary rounded-full"
//             onPress={() => router.push("/profile/EditProfile")}
//           >
//             <AppText className="font-bold text-background">Edit</AppText>
//           </TouchableOpacity>
//         </View>

//         {/* Profile Details */}
//         <View className="mb-4 ml-2">
//           <AppText className="text-xl font-bold text-primary">
//             {user?.fullName}
//           </AppText>

//           <AppText className="text-base text-primary">
//             @{user?.username}
//           </AppText>

//           <AppText className="text-sm text-primary">{user?.bio}</AppText>
//         </View>
//       </View>

//       {/* Navigation */}
//       <View className="flex-row justify-around items-center bg-primary p-2 mt-2">
//         <TouchableOpacity
//           className="items-center justify-center"
//           onPress={() => setActiveTab("list")}
//         >
//           <Ionicons
//             name="list-outline"
//             size={20}
//             color={
//               activeTab === "list" ? Colors.selection : Colors.background
//             }
//           />
//           <AppText
//             className={`mb-1 ${
//               activeTab === "list"
//                 ? "font-bold text-selection"
//                 : "text-background"
//             }`}
//           >
//             List
//           </AppText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="items-center justify-center"
//           onPress={() => setActiveTab("borrowed")}
//         >
//           <MaterialCommunityIcons
//             name="book-plus-multiple"
//             size={19}
//             color={
//               activeTab === "borrowed" ? Colors.selection : Colors.background
//             }
//           />
//           <AppText
//             className={`mb-1 ${
//               activeTab === "borrowed"
//                 ? "font-bold text-selection"
//                 : "text-background"
//             }`}
//           >
//             Borrowed
//           </AppText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="items-center justify-center"
//           onPress={() => setActiveTab("lent")}
//         >
//           <MaterialCommunityIcons
//             name="book-minus-multiple"
//             size={19}
//             color={
//               activeTab === "lent" ? Colors.selection : Colors.background
//             }
//           />
//           <AppText
//             className={`mb-1 ${
//               activeTab === "lent"
//                 ? "font-bold text-selection"
//                 : "text-background"
//             }`}
//           >
//             Lent
//           </AppText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="items-center justify-center"
//           onPress={() => setModalVisible(true)}
//         >
//           <MaterialIcons
//             name="library-add"
//             size={19}
//             color={
//               activeTab === "add" ? Colors.selection : Colors.background
//             }
//           />
//           <AppText className="text-background">Add</AppText>
//         </TouchableOpacity>
//       </View>

//       {/* Lists */}
//       {activeTab === "list" && (
//         <FlatList
//           data={bookCollection}
//           renderItem={renderBookItem}
//           keyExtractor={(item) => item._id.toString()}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           ListEmptyComponent={
//             <AppText className="text-center mt-5">No books available.</AppText>
//           }
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       {activeTab === "borrowed" && (
//         <FlatList
//           data={borrowedBooks}
//           renderItem={renderBookItem}
//           keyExtractor={(item) => item._id.toString()}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           ListEmptyComponent={
//             <AppText className="text-center mt-5">No books available.</AppText>
//           }
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       {activeTab === "lent" && (
//         <FlatList
//           data={lentBooks}
//           renderItem={renderBookItem}
//           keyExtractor={(item) => item._id.toString()}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           ListEmptyComponent={
//             <AppText className="text-center mt-5">No books available.</AppText>
//           }
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// };
// export default ProfileScreen;
