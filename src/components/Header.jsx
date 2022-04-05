import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateInfos } from '../utils/localStorage';
import { Popover, Transition } from '@headlessui/react'
import { UsersIcon, MenuIcon, PresentationChartLineIcon, XIcon, CheckCircleIcon, UserGroupIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import logo from '../trivia.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class Header extends React.Component {
  render() {
    const { hash } = generateInfos();
    const { name, score , assertions } = this.props;
    return (
      <Popover className="relative bg-white">
        <header className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-2">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="sr-only">Player image</span>
              <Link to="/">
                <img
                  data-testid="header-profile-picture"
                  src={`https://www.gravatar.com/avatar/${hash}`}
                  alt="Profile"
                  className="h-8 w-auto sm:h-10 rounded-full"
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Abrir menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex md:ml-logosm lg:ml-logo lg:flex-1">
              <Link to="/">
                <img src={logo} alt="Trivia IMG" className="h-8 w-auto justify-center" />
              </Link>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-5 md:space-x-10 mr-7 md:mr-0 justify-end">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      )}
                    >
                      <span>Nome</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-gray-600' : 'text-gray-400',
                          'ml-2 h-5 w-5 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-64 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <UsersIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="max-w-xs truncate text-base font-medium text-gray-900">{name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      )}
                    >
                      <span>Score</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-gray-600' : 'text-gray-400',
                          'ml-2 h-5 w-5 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-80 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/3 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <PresentationChartLineIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{score}</p>
                              </div>
                            </div>
                            <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{assertions}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-900' : 'text-gray-500',
                        'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      )}
                    >
                      <span>Links</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-gray-600' : 'text-gray-400',
                          'ml-2 h-5 w-5 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-logosm mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/3 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <PresentationChartLineIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <Link to="/ranking" className="text-base font-medium text-gray-900">Ranking</Link>
                              </div>
                            </div>
                            <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <UserGroupIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <Link to="/about" className="text-base font-medium text-gray-900">Sobre</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </div>
        </header>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Link to="/">
                      <img
                        data-testid="header-profile-picture"
                        src={`https://www.gravatar.com/avatar/${hash}`}
                        alt="Profile"
                        className="h-8 w-auto rounded-full"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link to="/">
                      <img
                        data-testid="header-profile-picture"
                        src={logo}
                        alt="logo"
                        className="h-8 w-auto"
                      />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Fechar menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-10">
                  <nav className="grid gap-y-8">
                    <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      <UsersIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="max-w-headersmall sm:max-w-sm md:max-w-md truncate ml-3 text-base font-medium text-gray-900">{name}</span>
                    </div>
                    <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      <PresentationChartLineIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{score}</span>
                    </div>
                    <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{assertions}</span>
                    </div>
                    <div className="-m-3 p-3 flex items-center justify-around hover:bg-gray-50 border-t-2">
                      <div>
                        <PresentationChartLineIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                        <Link to="/ranking" className="ml-3 text-base font-medium text-gray-900">
                          Ranking
                        </Link>
                      </div>
                      <div>
                        <UserGroupIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                        <Link to="/about" className="ml-3 text-base font-medium text-gray-900">
                          Sobre
                        </Link>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  }
}

const mapStateToProps = ({ user: { name, score, assertions } }) => ({
  name, score, assertions
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  assertions: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default connect(mapStateToProps)(Header);
