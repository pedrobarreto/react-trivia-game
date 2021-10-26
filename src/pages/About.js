import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class About extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="flex flex-col max-w-7xl mx-auto bg-white mt-10 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Integrantes do Grupo</h2>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="pt-8 border-t border-gray-200 px-4 py-5 sm:px-6">
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
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="pt-8 border-t border-gray-200 px-4 py-5 sm:px-6">
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
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="pt-8 border-t border-gray-200 px-4 py-5 sm:px-6">
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
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="pt-8 border-t border-gray-200 px-4 py-5 sm:px-6">
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
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
          <Link
            to="/"
            className="self-center"
          >
            <button
              type="button"
              className="max-w-7xl mt-10 mx-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 mb-1"
            >
              Jogar
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default About;