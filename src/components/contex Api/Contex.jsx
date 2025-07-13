import React, { createContext, useState, useEffect } from 'react'; // Added useEffect
import { getDatabase, ref, onValue, off, set } from 'firebase/database'; // Firebase imports for real-time
import app from '../configFiles/FireBase';
import { toast } from 'react-toastify';


const commonContex = createContext();

export default function Contex({ children }) {

    // --- Initial State Loading from LocalStorage (as you provided) ---
    // This runs once when the component first loads to get initial values.

    var cardData = localStorage.getItem('cardItem');
    var parsedCardData = JSON.parse(cardData); // Renamed for clarity, original was 'cardData' again
    const [cardItem, setCardItem] = useState(parsedCardData ? parsedCardData : []);

    var wishListData = localStorage.getItem('wishitem');
    var parsedWishListData = JSON.parse(wishListData); // Renamed for clarity
    const [wishList, setWishList] = useState(parsedWishListData ?? []);

    var userLogin = localStorage.getItem('user_uid');
    const [isLogin, setIsLogin] = useState(userLogin);

    // --- useEffect for Real-time Firebase Updates (New Addition) ---
    // This effect listens for changes in Firebase for the logged-in user's cart.
    useEffect(() => {
        let unsubscribeFromFirebase; // Holds the function to stop listening
        let userCartReference;       // Holds the path to the user's cart in Firebase

        // Only try to listen to Firebase if a user is logged in
        if (isLogin) {
            const db = getDatabase(app);
            userCartReference = ref(db, 'users_cart/' + isLogin); // Path for the current user's cart

            // Set up the real-time listener:
            // This function runs immediately and then every time data changes at userCartReference.
            unsubscribeFromFirebase = onValue(userCartReference, (snapshot) => {
                const cartDataFromFirebase = snapshot.val(); // Get the latest data

                if (cartDataFromFirebase) {
                    // If data exists, update our local 'cardItem' state
                    setCardItem(cartDataFromFirebase);
                } else {
                    // If no data (e.g., cart is empty in Firebase), clear our local 'cardItem'
                    setCardItem([]);
                }
            });
        } else {
            // If no user is logged in, ensure the cart is empty (for guest users)
            setCardItem([]);
        }

        // Cleanup function: This is crucial!
        // It runs when the component unmounts or before the effect runs again (e.g., on logout).
        // It stops the Firebase listener to prevent memory leaks and unnecessary operations.
        return () => {
            if (unsubscribeFromFirebase) {
                // Detach the listener from Firebase
                off(userCartReference, unsubscribeFromFirebase);
            }
        };
    }, [isLogin]); // This effect re-runs whenever the 'isLogin' status changes

    // --- useEffect for LocalStorage Sync (New Additions) ---
    // These effects ensure that any changes to 'cardItem' or 'wishList' states
    // are automatically saved back to localStorage.

    useEffect(() => {
        localStorage.setItem('cardItem', JSON.stringify(cardItem));
    }, [cardItem]); // Runs every time 'cardItem' state changes

    useEffect(() => {
        localStorage.setItem('wishitem', JSON.stringify(wishList));
    }, [wishList]); // Runs every time 'wishList' state changes



    // Add to cart Function

    const addToCard = (productInfo) => {

        const checkCart = cardItem.filter((v) => {
            if (productInfo.id == v.id) {
                return v;
            }
        })
        if (checkCart.length > 0) {

            const cartData = cardItem.map((data) => {
                if (productInfo.id == data.id) {
                    if (data.quantity < 3) {
                        data.quantity++;
                        toast.success('Cart Update successfully !')
                        return data;
                    } else {
                        toast.warn('Oops! Max quantity already in cart.')
                        return data;
                    }



                }
                else {
                    return data;
                }

            })
            const finalData = [...cartData];
            setCardItem(finalData);
            localStorage.setItem('cardItem', JSON.stringify(finalData));

            // FireBase Data write work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), finalData)

        } else {
            const info = {
                id: productInfo.id || '',
                name: productInfo.name || '',
                price: productInfo.price || 0,
                image: productInfo.image || '',
                category_name: productInfo.category_name || 'unknown',
                description: productInfo.description || '',
                brand_name: productInfo.brand_name || '',
                rating: productInfo.rating || 0,
                quantity: 1
            };
            const finalData = [info, ...cardItem]
            setCardItem(finalData);
            localStorage.setItem('cardItem', JSON.stringify(finalData));
            toast.success('Add To Card :)')

            // FireBase Data write work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), finalData)

        }
    }

    const wishlistProduct = (productInfo) => {
        const checkWish = wishList.filter((v) => productInfo.id === v.id);

        if (checkWish.length > 0) {
            const updatedWishList = wishList.map((data) => {
                if (productInfo.id === data.id) {
                    toast.warn('Oops! This item is already in your wishlist.');
                    return data; // do not add again
                } else {
                    return data;
                }
            });

            setWishList(updatedWishList);
            localStorage.setItem('wishitem', JSON.stringify(updatedWishList));
        } else {
            const info = {
                id: productInfo.id,
                name: productInfo.name,
                price: productInfo.price,
                image: productInfo.image,
                category_name: productInfo.category_name,
                description: productInfo.description,
                brand_name: productInfo.brand_name,
                rating: productInfo.rating,
                quantity: 1,
            };

            const finalData = [info, ...wishList];
            setWishList(finalData);
            localStorage.setItem('wishitem', JSON.stringify(finalData));
            toast.success('Added to wishlist ❤️');
        }
    };


    // --- Data to be Provided to Other Components ---
    const data = { cardItem, setCardItem, wishList, setWishList, isLogin, setIsLogin, addToCard, wishlistProduct };

    return (
        <>
            <commonContex.Provider value={data}>
                {children}
            </commonContex.Provider>
        </>
    );
}

export { commonContex };