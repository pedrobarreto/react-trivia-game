import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/solid';

class About extends React.Component {
  render() {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col bg-white mt-10 shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-5 sm:px-12">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Integrantes do Grupo</h2>
          </div>
          <div className="bg-white shadow overflow-hidden">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-md leading-6 font-medium text-gray-900">Paulo Eduardo De Sordi Gomes</h4>
            </div>
            <div>
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Github</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://github.com/pauloeduardods">
                      github.com/pauloeduardods
                    </a>
                  </dd>
                </div>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://www.linkedin.com/in/pauloeduardods">
                      linkedin.com/in/pauloeduardods
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-md leading-6 font-medium text-gray-900">Victor De Paula</h4>
            </div>
            <div>
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Github</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://github.com/VSSSP">
                      github.com/VSSSP
                    </a>
                  </dd>
                </div>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://www.linkedin.com/in/victorssspaula">
                      linkedin.com/in/victorssspaula
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-md leading-6 font-medium text-gray-900">Pedro Barreto</h4>
            </div>
            <div>
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Github</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://github.com/pedrobarreto">
                      github.com/pedrobarreto
                    </a>
                  </dd>
                </div>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://www.linkedin.com/in/barreto-pedro">
                      linkedin.com/in/barreto-pedro
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gradient-to-r from-indigo-50 to-indigo-100">
              <h4 className="text-md leading-6 font-medium text-gray-900">Lucas Mateus Duarte Oliveira</h4>
            </div>
            <div>
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Github</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://github.com/lucsduartee">
                      github.com/lucsduartee
                    </a>
                  </dd>
                </div>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="https://www.linkedin.com/in/dev-lucasduarte">
                      linkedin.com/in/dev-lucasduarte
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <Link to="/react-trivia-game" className="w-full flex justify-center mt-6">
          <button data-testid="btn-play-again" type="button" className="group relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 mb-10">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <PlayIcon className="h-5 w-5 text-white group-hover:text-indigo-200" aria-hidden="true" />
            </span>
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

export default About;