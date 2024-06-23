import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSpinner,
    faSearch,
    faXmark,
    faCaretDown,
    faLanguage,
    faBasketShopping,
    faBell,
    faUser,
    faSignOut,
    faWallet,
    faDollarSign,
    faBoxArchive,
    faGift,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

import Tippy from '@tippyjs/react/'
import HeadlessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import Button from '~/components/Button'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import GameItem from '~/components/GameItem'
import Menu from '~/components/Popper/Menu'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: (
            <>
                Tiếng Việt [BETA] &nbsp;&nbsp;
                <FontAwesomeIcon icon={faAngleRight} />
            </>
        ),
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
]

const usserMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Thông tin cá nhân',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faDollarSign} />,
        title: 'Nạp tiền',
        to: '/#',
    },
    {
        icon: <FontAwesomeIcon icon={faWallet} />,
        title: (
            <span>
                Ví: <span style={{ color: 'var(--steamPrice)' }}>1.000.000vnđ</span>
            </span>
        ),
        to: '/#',
    },
    {
        icon: <FontAwesomeIcon icon={faBoxArchive} />,
        title: 'Kho game',
        to: '/#',
    },
    {
        icon: <FontAwesomeIcon icon={faGift} />,
        title: 'Tặng quà',
        to: '/#',
        children: {
            title: 'Tặng quà',
            data: [
                {
                    type: 'gift',
                    code: 'gift-game',
                    title: 'Tặng game',
                },
                {
                    type: 'gift',
                    code: 'gift-money',
                    title: 'Tặng tiền',
                },
            ],
        },
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/#',
        line: true,
    },
]

const navLinkStyles = ({ isActive }) => {
    return {
        fontWeight: isActive ? '700' : '500',
        background: isActive ? 'var(--steamColorWhite)' : 'none',
        color: isActive ? 'var(--primary)' : 'var(--steamColorWhite)',
        transform: isActive ? ' scale(0.9)' : 'none',
    }
}

function Header() {
    const [searchResult, setSearchResult] = useState([])
    const [isScrolled, setIsScrolled] = useState(false)

    // khi đăng nhập
    const currentUser = true

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 0)
    }, [])

    // Handel logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
    }

    return (
        <header className={cx('wrapper', { scrolled: isScrolled })}>
            <div className={cx('inner')}>
                <div className={cx('navbar')}>
                    <ul>
                        <li>
                            <NavLink style={navLinkStyles} to="/">
                                Trang chủ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={navLinkStyles} to="/profile">
                                Thể loại game
                            </NavLink>
                        </li>

                        <li>
                            <NavLink style={navLinkStyles} to="/admin">
                                Hỗ trợ
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <HeadlessTippy
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <GameItem />
                                <GameItem />
                                <GameItem />
                                <GameItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <NavLink to="/cart">
                                <Tippy content="Thông báo" placement="bottom">
                                    <button className={cx('notification-btn')}>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className={cx('badge')}>3</span>
                                    </button>
                                </Tippy>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button outline className={cx('change-btn-color')}>
                                    Đăng Nhập
                                </Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button primary>Đăng Ký</Button>
                            </NavLink>
                        </>
                    )}
                    <NavLink to="/cart">
                        <Tippy content="Giỏ hàng" placement="bottom">
                            <button className={cx('cart-btn')}>
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <span className={cx('badge')}>3</span>
                            </button>
                        </Tippy>
                    </NavLink>
                    <Tippy content="Màu giao diện">
                        <input className={cx('switch')} type="checkbox" data-theme-toggle />
                    </Tippy>
                    <Menu items={currentUser ? usserMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {({ isAnimating }) =>
                            currentUser ? (
                                <Tippy content="Tài khoản" placement="bottom">
                                    <Image src="" className={cx('user-avatar')} alt="Tran Phuoc Thien" />
                                </Tippy>
                            ) : (
                                <button className={cx('more-btn', { 'is-animating': isAnimating })}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            )
                        }
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
