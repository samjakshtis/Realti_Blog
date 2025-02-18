"use client"

import { useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'

export default function SupportPage() {
    // Add useEffect to load the Shopify script
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            (function () {
                var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
                if (window.ShopifyBuy) {
                    if (window.ShopifyBuy.UI) {
                        ShopifyBuyInit();
                    } else {
                        loadScript();
                    }
                } else {
                    loadScript();
                }
                function loadScript() {
                    var script = document.createElement('script');
                    script.async = true;
                    script.src = scriptURL;
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
                    script.onload = ShopifyBuyInit;
                }
                function ShopifyBuyInit() {
                    var client = ShopifyBuy.buildClient({
                        domain: '13ewze-ki.myshopify.com',
                        storefrontAccessToken: '744a710445b4aa33c8ae7c61d183bac5',
                    });
                    ShopifyBuy.UI.onReady(client).then(function (ui) {
                        ui.createComponent('product', {
                            id: '9856764543254',
                            node: document.getElementById('product-component-1738868472176'),
                            moneyFormat: '%24%7B%7Bamount%7D%7D',
                            options: {
                                "product": {
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                            }
                                        },
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "quantityInput": {
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px"
                                        }
                                    },
                                    "text": {
                                        "button": "Add to cart"
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                },
                                "productSet": {
                                    "styles": {
                                        "products": {
                                            "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                            }
                                        }
                                    }
                                },
                                "modalProduct": {
                                    "contents": {
                                        "img": false,
                                        "imgWithCarousel": true,
                                        "button": false,
                                        "buttonWithQuantity": true
                                    },
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                            }
                                        },
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "quantityInput": {
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px"
                                        }
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ],
                                    "text": {
                                        "button": "Add to cart"
                                    }
                                },
                                "option": {},
                                "cart": {
                                    "styles": {
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        }
                                    },
                                    "text": {
                                        "total": "Subtotal",
                                        "button": "Checkout"
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                },
                                "toggle": {
                                    "styles": {
                                        "toggle": {
                                            "font-family": "Lato, sans-serif",
                                            "background-color": "#5900b3",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "count": {
                                            "font-size": "16px"
                                        }
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                }
                            },
                        });

                        ui.createComponent('product', {
                            id: '9856759562518',
                            node: document.getElementById('product-component-1738869298377'),
                            moneyFormat: '%24%7B%7Bamount%7D%7D',
                            options: {
                                "product": {
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                            }
                                        },
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "quantityInput": {
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px"
                                        }
                                    },
                                    "text": {
                                        "button": "Add to cart"
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                },
                                "productSet": {
                                    "styles": {
                                        "products": {
                                            "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                            }
                                        }
                                    }
                                },
                                "modalProduct": {
                                    "contents": {
                                        "img": false,
                                        "imgWithCarousel": true,
                                        "button": false,
                                        "buttonWithQuantity": true
                                    },
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                            }
                                        },
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "quantityInput": {
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px"
                                        }
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ],
                                    "text": {
                                        "button": "Add to cart"
                                    }
                                },
                                "option": {},
                                "cart": {
                                    "styles": {
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        }
                                    },
                                    "text": {
                                        "total": "Subtotal",
                                        "button": "Checkout"
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                },
                                "toggle": {
                                    "styles": {
                                        "toggle": {
                                            "font-family": "Lato, sans-serif",
                                            "background-color": "#5900b3",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "count": {
                                            "font-size": "16px"
                                        }
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                }
                            },
                        });

                        ui.createComponent('product', {
                            id: '9856761037078',
                            node: document.getElementById('product-component-1738869331104'),
                            moneyFormat: '%24%7B%7Bamount%7D%7D',
                            options: {
                                "product": {
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                            }
                                        },
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "quantityInput": {
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px"
                                        }
                                    },
                                    "text": {
                                        "button": "Add to cart"
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                },
                                "productSet": {
                                    "styles": {
                                        "products": {
                                            "@media (min-width: 601px)": {
                                                "margin-left": "-20px"
                                            }
                                        }
                                    }
                                },
                                "modalProduct": {
                                    "contents": {
                                        "img": false,
                                        "imgWithCarousel": true,
                                        "button": false,
                                        "buttonWithQuantity": true
                                    },
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "0px"
                                            }
                                        },
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "quantityInput": {
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px"
                                        }
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ],
                                    "text": {
                                        "button": "Add to cart"
                                    }
                                },
                                "option": {},
                                "cart": {
                                    "styles": {
                                        "button": {
                                            "font-family": "Lato, sans-serif",
                                            "font-size": "16px",
                                            "padding-top": "16px",
                                            "padding-bottom": "16px",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            "background-color": "#5900b3",
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        }
                                    },
                                    "text": {
                                        "total": "Subtotal",
                                        "button": "Checkout"
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                },
                                "toggle": {
                                    "styles": {
                                        "toggle": {
                                            "font-family": "Lato, sans-serif",
                                            "background-color": "#5900b3",
                                            ":hover": {
                                                "background-color": "#9700ff"
                                            },
                                            ":focus": {
                                                "background-color": "#9700ff"
                                            }
                                        },
                                        "count": {
                                            "font-size": "16px"
                                        }
                                    },
                                    "googleFonts": [
                                        "Lato"
                                    ]
                                }
                            },
                        });
                    });
                }
            })();
        `;
        document.body.appendChild(script);
    }, []);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Show your support for real estate education by wearing our merchandise.
                        All proceeds help us create more educational content and resources.
                    </p>
                </div>

                {/* Shopify Buy Buttons */}
                <div className="flex justify-between">
                    <div id='product-component-1738868472176'></div>
                    <div id='product-component-1738869298377'></div>
                    <div id='product-component-1738869331104'></div>
                </div>

                {/* Mission Impact Section */}
                <div className="mt-16 opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
                    <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#EC6227] via-[#E80458] to-[#5900B3] w-max mx-auto mb-6">Your Support Makes a Difference</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Educational Content</h3>
                            <p className="text-gray-600">Help us create more free educational resources for the community</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Community Growth</h3>
                            <p className="text-gray-600">Support the expansion of our real estate education community</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Platform Development</h3>
                            <p className="text-gray-600">Enable us to build better tools and features for learners</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
} 