
import Slider from 'react-slick';
import { Box } from '@mui/material';

// Custom gradient mapping for different account types
const accountGradients = {
    'conto base': 'linear-gradient(to top right, #975af4, #2f7cf8 40%, #78aafa 65%, #934cff 100%)',
    'conto giovani': 'linear-gradient(to top right, #4caf50, #2f7cf8 40%, #78aafa 65%, #4caf50 100%)',
    'conto plus': 'linear-gradient(to top right, #2196f3, #2f7cf8 40%, #78aafa 65%, #1976d2 100%)',
    'conto next': 'linear-gradient(to top right, #ff9800, #2f7cf8 40%, #78aafa 65%, #f57c00 100%)',
    'conto premium': 'linear-gradient(to top right, #9c27b0, #2f7cf8 40%, #78aafa 65%, #7b1fa2 100%)',
    'conto platinum': 'linear-gradient(to top right, #e0e0e0, #2f7cf8 40%, #78aafa 65%, #bdbdbd 100%)',
};

// Function to get account features based on account type
const getAccountFeatures = (accountType) => {
    const baseFeatures = ["Everything in Free"];

    const accountSpecificFeatures = {
        'conto base': ["Basic Security", "Simple Dashboard", "Standard Support"],
        'conto giovani': ["Student Discounts", "No Monthly Fee", "Mobile Banking"],
        'conto plus': ["Customizable Dashboards", "Advanced Budgeting", "Enhanced Security"],
        'conto next': ["Premium Cards", "Investment Options", "Priority Support"],
        'conto premium': ["Wealth Management", "Exclusive Rewards", "Concierge Service"],
        'conto platinum': ["Private Banking", "Global Access", "Personal Financial Advisor"],
    };

    const type = accountType.toLowerCase().replace(/^conto\s*/, 'conto ');
    return accountSpecificFeatures[type] || baseFeatures;
};

const OffersCarousel = ({ accounts }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
        appendDots: dots => <ul style={{ overflow: 'visible', padding: 0 }}>{dots}</ul>,
    };

    return (
        <Slider {...settings}>
            {accounts.map(acc => {
                const rawType = (acc.accountType || '').trim().toLowerCase();
                const key = `conto ${rawType.replace(/^conto\s*/, '')}`;
                const gradient = accountGradients[key] || accountGradients['conto base'];
                const features = getAccountFeatures(key);

                // Determine if account should be marked as popular
                const isPopular = acc.isPopular || key === 'conto plus'; // Example logic for popular flag

                return (
                    <Box key={acc.id} sx={{ padding: '10px', fontFamily: 'Montserrat, sans-serif' }}>
                        <div className="card-container" style={{ width: '260px', background: gradient, padding: '4px', borderRadius: '32px', display: 'flex', flexDirection: 'column' }}>
                            <div className="title-card" style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', justifyContent: 'space-between', color: '#fff' }}>
                                <p style={{ fontSize: '14px', fontWeight: 600, fontStyle: 'italic', textShadow: '2px 2px 6px #2975ee' }}>
                                    {isPopular ? "MOST POPULAR" : acc.accountType.toUpperCase()}
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M10.277 16.515c.005-.11.187-.154.24-.058c.254.45.686 1.111 1.177 1.412c.49.3 1.275.386 1.791.408c.11.005.154.186.058.24c-.45.254-1.111.686-1.412 1.176s-.386 1.276-.408 1.792c-.005.11-.187.153-.24.057c-.254-.45-.686-1.11-1.176-1.411s-1.276-.386-1.792-.408c-.11-.005-.153-.187-.057-.24c.45-.254 1.11-.686 1.411-1.177c.301-.49.386-1.276.408-1.791m8.215-1c-.008-.11-.2-.156-.257-.062c-.172.283-.421.623-.697.793s-.693.236-1.023.262c-.11.008-.155.2-.062.257c.283.172.624.42.793.697s.237.693.262 1.023c.009.11.2.155.258.061c.172-.282.42-.623.697-.792s.692-.237 1.022-.262c.11-.009.156-.2.062-.258c-.283-.172-.624-.42-.793-.697s-.236-.692-.262-1.022M14.704 4.002l-.242-.306c-.937-1.183-1.405-1.775-1.95-1.688c-.545.088-.806.796-1.327 2.213l-.134.366c-.149.403-.223.604-.364.752c-.143.148-.336.225-.724.38l-.353.141l-.248.1c-1.2.48-1.804.753-1.881 1.283c-.082.565.49 1.049 1.634 2.016l.296.25c.325.275.488.413.58.6c.094.187.107.403.134.835l.024.393c.093 1.52.14 2.28.634 2.542s1.108-.147 2.336-.966l.318-.212c.35-.233.524-.35.723-.381c.2-.032.402.024.806.136l.368.102c1.422.394 2.133.591 2.52.188c.388-.403.196-1.14-.19-2.613l-.099-.381c-.11-.419-.164-.628-.134-.835s.142-.389.365-.752l.203-.33c.786-1.276 1.179-1.914.924-2.426c-.254-.51-.987-.557-2.454-.648l-.379-.024c-.417-.026-.625-.039-.806-.135c-.18-.096-.314-.264-.58-.6m-5.869 9.324C6.698 14.37 4.919 16.024 4.248 18c-.752-4.707.292-7.747 1.965-9.637c.144.295.332.539.5.73c.35.396.852.82 1.362 1.251l.367.31l.17.145c.005.064.01.14.015.237l.03.485c.04.655.08 1.294.178 1.805"
                                    ></path>
                                </svg>
                            </div>
                            <div className="card-content" style={{ width: '100%', height: '100%', backgroundColor: '#161a20', borderRadius: '30px', color: '#838383', fontSize: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                <p className="title" style={{ fontSize: '22px', fontWeight: 600, color: '#bab9b9' }}>
                                    {acc.accountType}
                                </p>
                                <p className="plain">
                                    <span style={{ fontSize: '36px', color: '#fff' }}>€{acc.monthlyFee.toFixed(2)}</span>
                                    <span>/ month</span>
                                </p>
                                <p className="description" style={{ fontSize: '12px', color: '#838383' }}>
                                    Interest Rate: {acc.interestRate}% • Promo: {acc.promotionNumber}
                                </p>
                                <button className="card-btn" style={{
                                    background: `linear-gradient(4deg, #975af4, #2f7cf8 40%, #78aafa 65%, #934cff 100%)`,
                                    padding: '8px',
                                    border: 'none',
                                    width: '100%',
                                    borderRadius: '8px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontSize: '12px',
                                    transition: 'all 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.6)'
                                }}>
                                    Open Account
                                </button>

                                <div className="card-separate" style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', fontSize: '10px', color: 'rgba(131, 131, 131, 0.5)' }}>
                                    <div className="separate" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(131, 131, 131, 0.5)' }}></div>
                                    <p>FEATURES</p>
                                    <div className="separate" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(131, 131, 131, 0.5)' }}></div>
                                </div>

                                <div className="card-list-features" style={{ color: '#bab9b9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {features.map((feature, index) => (
                                        <div key={index} className="option" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <svg
                                                viewBox="0 0 24 24"
                                                height="14"
                                                width="14"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="none"
                                                >
                                                    <rect rx="4" y="3" x="3" height="18" width="18"></rect>
                                                    <path d="m9 12l2.25 2L15 10"></path>
                                                </g>
                                            </svg>
                                            <p>{feature}</p>
                                        </div>
                                    ))}

                                    {/* Display available card types */}
                                    {acc.cards && acc.cards.length > 0 && (
                                        <div className="option" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <svg
                                                viewBox="0 0 24 24"
                                                height="14"
                                                width="14"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="none"
                                                >
                                                    <rect rx="4" y="3" x="3" height="18" width="18"></rect>
                                                    <path d="m9 12l2.25 2L15 10"></path>
                                                </g>
                                            </svg>
                                            <p>{acc.cards[0].cardType + (acc.cards.length > 1 ? ` +${acc.cards.length - 1}` : '')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Box>
                );
            })}
        </Slider>
    );
};

export default OffersCarousel;