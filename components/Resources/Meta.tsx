import Head from "next/head"

interface MetaProps {
    title: string;
    description: string;
    homepage?: boolean;
}

const Meta = ({ title, description, homepage }: MetaProps) => {
    return (
        <Head>
                <title>{`${title}${!homepage ? ` - Premier`: '' }`}</title>
                <meta property='og:title' content={`${title}${!homepage ? ` - ${title}` : '' }`} />
                <meta property='twitter:title' content={`${title}${!homepage ? ` - ${title}`: '' }`} />

                <meta property='description' content={description} />
                <meta property="og:description" content={description} />
                <meta name="twitter:description" content={description} />

                <meta property="og:image" content={'https://i.imgur.com/sGehvFE.png'} />
                <meta name="twitter:image" content={'https://i.imgur.com/sGehvFE.png'} />
                <meta name="image" content={'https://i.imgur.com/sGehvFE.png'} />

                <meta property='og:type' content='article'/>
                <meta name='twitter:card' content='summary_large_image'/>

        </Head>
    )
}

export default Meta