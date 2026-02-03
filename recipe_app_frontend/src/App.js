import React, { Suspense, lazy, useCallback, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const Home = lazy(() => import("./pages/Home"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// PUBLIC_INTERFACE
function App() {
  /** App entry with routes, retro layout, and global (persisted) search state. */
  const [search, setSearch] = useLocalStorageState("recipe_app:last_search", "");
  const debouncedSearch = useDebouncedValue(search, 250);

  const clearSearch = useCallback(() => setSearch(""), [setSearch]);

  // Convenience: escape clears search when focus is in the search input.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") clearSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clearSearch]);

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          searchValue={search}
          onSearchChange={setSearch}
          onClearSearch={clearSearch}
        />

        <Suspense
          fallback={
            <main className="main" role="main">
              <div className="container">
                <div className="card panel">
                  <h1 className="page-title">Loading…</h1>
                  <p className="page-subtitle">Warming up the oven.</p>
                </div>
              </div>
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<Home debouncedSearch={debouncedSearch} />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
