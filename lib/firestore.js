import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

// --- Genre Preferences ---

export async function saveUserGenres(uid, genres) {
  await setDoc(doc(db, "users", uid), { genres }, { merge: true });
}

export async function getUserGenres(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().genres : null;
}

// --- Watchlist ---

export async function addToWatchlist(uid, movie) {
  await setDoc(doc(db, "users", uid, "watchlist", String(movie.id)), {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.release_date,
    added_at: new Date().toISOString(),
  });
}

export async function removeFromWatchlist(uid, movieId) {
  await deleteDoc(doc(db, "users", uid, "watchlist", String(movieId)));
}

export async function getWatchlist(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "watchlist"));
  return snapshot.docs.map((d) => d.data());
}

// --- Reviews ---

export async function addReview(uid, movieId, reviewData) {
  await setDoc(doc(db, "users", uid, "reviews", String(movieId)), {
    movieId,
    ...reviewData,
    reviewed_at: new Date().toISOString(),
  });
}

export async function getUserReviews(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "reviews"));
  return snapshot.docs.map((d) => d.data());
}

export async function deleteReview(uid, movieId) {
  await deleteDoc(doc(db, "users", uid, "reviews", String(movieId)));
}
