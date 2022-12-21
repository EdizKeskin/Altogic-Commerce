import { Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "react-tsparticles";
import altogic from "./api/altogic";

import { getUserById } from "./api/storage";
import Navbar from "./components/navbar";
import RequiresAdmin from "./components/routes/requiresAdmin";
import RequiresAuth from "./components/routes/requiresAuth";
import RequiresNotAuth from "./components/routes/requiresNotAuth";
import { AuthenticationProvider } from "./context/authContext";
import Admin from "./pages/Admin/admin";
import EditProduct from "./pages/Admin/editProduct/editProduct";
import NewProduct from "./pages/Admin/newProduct/newProduct";
import Orders from "./pages/Admin/orders/orders";
import AdminProducts from "./pages/Admin/products/adminProducts";
import AuthRedirect from "./pages/Auth/authRedirect";
import SignIn from "./pages/Auth/signIn";
import SignUp from "./pages/Auth/signUp";
import Verification from "./pages/Auth/verification";
import Basket from "./pages/Basket/basket";
import Categories from "./pages/Categories/categories";
import Contact from "./pages/Contact/contact";
import Err404 from "./pages/Err/err404";
import Detail from "./pages/ProductDetails/product";
import Profile from "./pages/Profile/profile";
import Sessions from "./pages/Profile/sessions";
import Home from "./pages/home";

function App() {
  const [products, setProducts] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");

  useEffect(() => {
    const getProducts = async () => {
      const result = await altogic.db
        .model("products")
        .sort(sort, sortType)
        .get();

      if (!result.errors) {
        setProducts(result.data);
      }
    };
    getProducts();
  }, [sort, sortType]);

  useEffect(() => {
    async function fetchUser() {
      const result = await getUserById(altogic.auth.getUser()._id);
      setAdmin(result.data.admin);
    }
    fetchUser();
  }, []);

  const bg = useColorModeValue("white", "#000000");

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease",
    });
    AOS.refresh();
  }, []);
  return (
    <Box>
      <Particles
        id="tsparticles"
        options={{
          autoPlay: true,
          background: {
            color: {
              value: bg,
            },
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
            opacity: 1,
          },
          backgroundMask: {
            composite: "destination-out",
            cover: {
              color: {
                value: "#fff",
              },
              opacity: 1,
            },
            enable: false,
          },
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          detectRetina: true,
          duration: 0,
          fpsLimit: 120,
          interactivity: {
            detectsOn: "window",
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onDiv: {
                selectors: [],
                enable: false,
                mode: [],
                type: "circle",
              },

              resize: true,
            },
            modes: {
              attract: {
                distance: 200,
                duration: 0.4,
                easing: "ease-out-quad",
                factor: 1,
                maxSpeed: 50,
                speed: 0.1,
              },
              bounce: {
                distance: 200,
              },
              bubble: {
                distance: 400,
                duration: 2,
                mix: false,
                opacity: 0.8,
                color: {
                  value: "#ff0000",
                },
                size: 40,
                divs: {
                  distance: 200,
                  duration: 0.4,
                  mix: false,
                  selectors: [],
                },
              },
              connect: {
                distance: 80,
                links: {
                  opacity: 0.5,
                },
                radius: 60,
              },
              grab: {
                distance: 400,
                links: {
                  blink: false,
                  consent: false,
                  opacity: 1,
                },
              },
              light: {
                area: {
                  gradient: {
                    start: {
                      value: "#ffffff",
                    },
                    stop: {
                      value: "#000000",
                    },
                  },
                  radius: 1000,
                },
                shadow: {
                  color: {
                    value: "#000000",
                  },
                  length: 2000,
                },
              },
              push: {
                default: true,
                groups: [],
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
                factor: 100,
                speed: 0.1,
                maxSpeed: 50,
                easing: "ease-out-quad",
                divs: {
                  distance: 200,
                  duration: 0.4,
                  factor: 100,
                  speed: 0.1,
                  maxSpeed: 50,
                  easing: "ease-out-quad",
                  selectors: [],
                },
              },
              slow: {
                factor: 3,
                radius: 200,
              },
              trail: {
                delay: 1,
                pauseOnStop: false,
                quantity: 1,
              },
            },
          },
          manualParticles: [],
          motion: {
            disable: false,
            reduce: {
              factor: 4,
              value: true,
            },
          },
          particles: {
            bounce: {
              horizontal: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              vertical: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
            },
            collisions: {
              bounce: {
                horizontal: {
                  random: {
                    enable: false,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
                vertical: {
                  random: {
                    enable: false,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
              },
              enable: false,
              mode: "bounce",
              overlap: {
                enable: true,
                retries: 0,
              },
            },
            color: {
              value: "#1b1e34",
              animation: {
                h: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 0.1,
                  sync: true,
                },
                s: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 0.1,
                  sync: true,
                },
                l: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 0.1,
                  sync: true,
                },
              },
            },
            destroy: {
              mode: "none",
              split: {
                count: 1,
                factor: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 3,
                },
                rate: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: {
                    min: 4,
                    max: 9,
                  },
                },
                sizeOffset: true,
              },
            },
            gradient: [],
            groups: {},
            life: {
              count: 0,
              delay: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                sync: false,
              },
              duration: {
                random: {
                  enable: false,
                  minimumValue: 0.0001,
                },
                value: 0,
                sync: false,
              },
            },
            links: {
              blink: false,
              color: {
                value: "#ffffff",
              },
              consent: false,
              distance: 200,
              enable: false,
              frequency: 1,
              opacity: 1,
              shadow: {
                blur: 5,
                color: {
                  value: "#000",
                },
                enable: false,
              },
              triangles: {
                enable: false,
                frequency: 1,
              },
              width: 2,
              warp: false,
            },
            move: {
              angle: {
                offset: 0,
                value: 90,
              },
              attract: {
                distance: 200,
                enable: false,
                rotate: {
                  x: 600,
                  y: 1200,
                },
              },
              center: {
                x: 50,
                y: 50,
                radius: 0,
              },
              decay: 0,
              distance: {},
              direction: "none",
              drift: 0,
              enable: true,
              gravity: {
                acceleration: 9.81,
                enable: false,
                inverse: false,
                maxSpeed: 50,
              },
              path: {
                clamp: true,
                delay: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 0,
                },
                enable: false,
                options: {},
              },
              outModes: {
                default: "out",
                bottom: "out",
                left: "out",
                right: "out",
                top: "out",
              },
              random: false,
              size: false,
              speed: 8,
              spin: {
                acceleration: 0,
                enable: false,
              },
              straight: false,
              trail: {
                enable: false,
                length: 10,
                fillColor: {
                  value: "#000000",
                },
              },
              vibrate: false,
              warp: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
                factor: 1000,
              },
              limit: 0,
              value: 6,
            },
            opacity: {
              random: {
                enable: true,
                minimumValue: 0.3,
              },
              value: {
                min: 0.3,
                max: 0.5,
              },
              animation: {
                count: 0,
                enable: false,
                speed: 0.1,
                sync: false,
                destroy: "none",
                startValue: "random",
                minimumValue: 0.1,
              },
            },
            orbit: {
              animation: {
                count: 0,
                enable: false,
                speed: 0.1,
                sync: false,
              },
              enable: false,
              opacity: 1,
              rotation: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 45,
              },
              width: 1,
            },
            reduceDuplicates: false,
            repulse: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
              enabled: false,
              distance: 1,
              duration: 1,
              factor: 1,
              speed: 0.1,
            },
            roll: {
              darken: {
                enable: false,
                value: 0,
              },
              enable: false,
              enlighten: {
                enable: false,
                value: 0,
              },
              mode: "vertical",
              speed: 25,
            },
            rotate: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
              animation: {
                enable: false,
                speed: 0,
                sync: false,
              },
              direction: "clockwise",
              path: false,
            },
            shadow: {
              blur: 0,
              color: {
                value: "#000",
              },
              enable: false,
              offset: {
                x: 0,
                y: 0,
              },
            },
            shape: {
              options: {
                polygon: {
                  sides: 6,
                },
                star: {
                  sides: 6,
                },
              },
              type: "polygon",
            },
            size: {
              random: {
                enable: true,
                minimumValue: 100,
              },
              value: {
                min: 100,
                max: 160,
              },
              animation: {
                count: 0,
                enable: false,
                speed: 5,
                sync: false,
                destroy: "none",
                startValue: "random",
                minimumValue: 40,
              },
            },
            stroke: {
              width: 0,
            },
            tilt: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
              animation: {
                enable: false,
                speed: 0,
                sync: false,
              },
              direction: "clockwise",
              enable: false,
            },
            twinkle: {
              lines: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
              },
              particles: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
              },
            },
            wobble: {
              distance: 5,
              enable: false,
              speed: 50,
            },
            zIndex: {
              random: {
                enable: false,
                minimumValue: -1,
              },
              value: 0,
              opacityRate: 1,
              sizeRate: 1,
              velocityRate: 1,
            },
          },
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          responsive: [],
          style: {},
          themes: [],
          zLayers: 100,
        }}
      />
      <Router>
        <AuthenticationProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="*" element={<Err404 />} />
              <Route
                path="/"
                element={
                  <Home
                    products={products}
                    sort={sort}
                    setSort={setSort}
                    setSortType={setSortType}
                    sortType={sortType}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={<Detail products={products} />}
              />
              <Route
                path="/categories/:category"
                element={<Categories products={products} />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/signin"
                element={
                  <RequiresNotAuth>
                    <SignIn />
                  </RequiresNotAuth>
                }
              />
              <Route
                path="/signup"
                element={
                  <RequiresNotAuth>
                    <SignUp />
                  </RequiresNotAuth>
                }
              />
              <Route
                path="/verification"
                element={
                  <RequiresNotAuth>
                    <Verification />
                  </RequiresNotAuth>
                }
              />
              <Route path="/auth-redirect" element={<AuthRedirect />} />
              <Route
                path="/profile"
                element={
                  <RequiresAuth>
                    <Profile />
                  </RequiresAuth>
                }
              />
              <Route
                path="/basket"
                element={
                  <RequiresAuth>
                    <Basket />
                  </RequiresAuth>
                }
              />
              <Route
                path="/sessions"
                element={
                  <RequiresAuth>
                    <Sessions />
                  </RequiresAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequiresAuth>
                    <RequiresAdmin admin={admin}>
                      <Admin />
                    </RequiresAdmin>
                  </RequiresAuth>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RequiresAuth>
                    <RequiresAdmin admin={admin}>
                      <Orders />
                    </RequiresAdmin>
                  </RequiresAuth>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <RequiresAuth>
                    <RequiresAdmin admin={admin}>
                      <AdminProducts />
                    </RequiresAdmin>
                  </RequiresAuth>
                }
              />
              <Route
                path="/admin/products/:product_id"
                element={
                  <RequiresAuth>
                    <RequiresAdmin admin={admin}>
                      <EditProduct />
                    </RequiresAdmin>
                  </RequiresAuth>
                }
              />
              <Route
                path="/admin/products/newproduct"
                element={
                  <RequiresAuth>
                    <RequiresAdmin admin={admin}>
                      <NewProduct />
                    </RequiresAdmin>
                  </RequiresAuth>
                }
              />
            </Routes>
          </div>
        </AuthenticationProvider>
      </Router>
    </Box>
  );
}

export default App;
