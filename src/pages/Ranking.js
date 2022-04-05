import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRankings } from '../utils/localStorage';
import { PlayIcon } from '@heroicons/react/solid';
import logo from '../trivia.png';

export default class Ranking extends Component {
  render() {
    return (
      <div className="flex flex-col mt-4">
        <div className="min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 sm:p-3">
            <div className="relative">
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ranking</h2>
            </div>
          </div>
        </div>
        <div className="-my-2 overflow-x-auto flex justify-center">
          <div className="py-2 align-middle inline-block max-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-t border-gray-300 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">NOME</th>
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">SCORE</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getRankings().map(({ name, score, picture }, i) => (
                    <tr key={ i }>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={picture} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 max-w-mintablename md:max-w-xl 2xl:max-w-7xl truncate">{name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <span className="px-5 inline-flex text-xl leading-5 font-semibold tabular-nums text-left">
                          {score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/react-trivia-game">
              <button data-testid="btn-play-again" type="button" className="my-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 mb-3">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlayIcon className="h-5 w-5 text-white group-hover:text-indigo-200" aria-hidden="true" />
                </span>
                Jogar novamente
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
