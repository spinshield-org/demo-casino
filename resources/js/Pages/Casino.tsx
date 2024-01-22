// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link, Head } from "@inertiajs/react";
import { CasinoPageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import CasinoGames from "@/Components/CasinoGames";
import Promocode from "@/Components/Promocode";
import FreespinNotification from "@/Components/FreespinNotification";
import RegisterModal from "@/Components/RegisterModal";
import LoginModal from "@/Components/LoginModal";
import { useBalanceProvider } from "@/lib/balance-provider";
import PromocodeModal from "@/Components/PromocodeModal";

export default function CasinoGuest({
  auth,
  showOptions,
  games,
}: CasinoPageProps<{ laravelVersion: string; phpVersion: string }>) {
  const [balanceUsd, setBalanceUsd] = useState(0);
  const [balanceEur, setBalanceEur] = useState(0);
  const [balanceBrl, setBalanceBrl] = useState(0);
  const [balanceGbp, setBalanceGbp] = useState(0);
  const [balanceData, setBalanceData] = useBalanceProvider();

  useEffect(() => {
      if(auth.user) {
        setBalanceUsd(auth.user.usd);
        setBalanceBrl(auth.user.brl);
        setBalanceEur(auth.user.eur);
        setBalanceGbp(auth.user.gbp);
      }
  }, [auth.user]);

  useEffect(() => {
    if(auth.user) {
      if(balanceData.usd > 0 && balanceData.usd !== balanceUsd) {
        setBalanceUsd(balanceData.usd);
      }
      if(balanceData.brl > 0 && balanceData.brl !== balanceBrl) {
        setBalanceUsd(balanceData.brl);
      }
      if(balanceData.eur > 0 && balanceData.eur !== balanceEur) {
        setBalanceEur(balanceData.eur);
      }
      if(balanceData.gbp > 0 && balanceData.gbp !== balanceGbp) {
        setBalanceGbp(balanceData.gbp);
      }
    }
}, [balanceData]);

  function storeCurrency(currency) {
    try {
      localStorage.setItem("currency", currency);
    } catch(exception) {
      console.log(exception);
    }
  }

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function changeCurrency(event, currency) {
    await event.preventDefault();

    if(currencySet !== currency) {
      await storeCurrency(currency);
      await sleep(75);
      await window.location.reload();
    }
  }

  const defaultCurrency = "usd";
  const currencySet = currencyLoad();

  function currencyLoad() {
    try {
    var currency = localStorage.getItem("currency");
    if(currency) {
      if(currency === "usd" || currency === "eur" || currency === "brl" || currency === "gbp") {
        return currency;
      } else {
        storeCurrency(defaultCurrency);
        return defaultCurrency;
      }
    } else {
      storeCurrency(defaultCurrency);
      return defaultCurrency;
    }
    } catch(exception) {
      console.log(exception);
      return defaultCurrency;
    }
  }

  return (
    <>
      <Head title="Games" />
      <div className="relative sm:justify-center sm:items-center min-h-screen bg-center bg-theme-900 selection:bg-theme-500 selection:text-white">
        <div className="relative p-6 text-right">
          {auth.user ? (
            <>
              <Link
                href="#"
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                <Button 
                  onClick={(event) => changeCurrency(event, 'usd')}
                  variant="outline" 
                  disabled={currencySet === "usd" ? true : false}
                >
                  <b>$</b>
                  <small>{balanceUsd > 0
                    ? (balanceUsd / 100).toFixed(2)
                    : "0.00"}</small>
                </Button>
                <Button 
                  className="ml-1"
                  onClick={(event) => changeCurrency(event, 'eur')}
                  variant="outline"
                  disabled={currencySet === "eur" ? true : false}
                >
                  <b>€</b>
                  <small>{balanceEur > 0
                    ? (balanceEur / 100).toFixed(2)
                    : "0.00"}</small>
                </Button>
                <Button 
                  className="ml-1"
                  onClick={(event) => changeCurrency(event, 'brl')}
                  variant="outline"
                  disabled={currencySet === "brl" ? true : false}
                >
                  <b>R$</b>
                  <small>{balanceEur > 0
                    ? (balanceBrl / 100).toFixed(2)
                    : "0.00"}</small>
                </Button>
                <Button 
                  className="ml-1"
                  onClick={(event) => changeCurrency(event, 'gbp')}
                  variant="outline"
                  disabled={currencySet === "gbp" ? true : false}
                >
                  <b>£</b>
                  <small>{balanceGbp > 0
                    ? (balanceGbp / 100).toFixed(2)
                    : "0.00"}</small>
                </Button>
                <PromocodeModal />
              </Link>
              <Link
                href={route("logout")}
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                <Button variant="destructive">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-end mt-4">
                <LoginModal />
              <div
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                  <RegisterModal />
              </div>
              </div>
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          {auth.user ? (
            <>
              {auth.user.fs_available === 1 ? (
                <div className="mt-1">
                  <FreespinNotification freespins={auth.user.fs_spins} />
                </div>
              ) : (
                <></>
              )}

              <div className="mt-1">
                <CasinoGames selectedCurrency={currencySet} games={games} showOptions={showOptions} />
              </div>
            </>
          ) : (
            <>
              <div className="mt-1">
                <CasinoGames selectedCurrency={currencySet} games={games} showOptions={showOptions} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
