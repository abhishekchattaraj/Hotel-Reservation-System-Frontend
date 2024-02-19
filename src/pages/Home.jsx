import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
        <Hero hero="defaultHero">
        </Hero>
        <Banner title="Happy Stay" subtitle="Make your trip happy and comfortable with Happy Stay">
                <Link to="/user/dashboard" className="btn btn-primary">
                      Dashboard
                </Link>
        </Banner>
        <Services></Services>
        </>

    )
}
