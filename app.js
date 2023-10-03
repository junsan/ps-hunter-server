import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getTitleTrophies,
    getUserTitles,
    makeUniversalSearch
  }  from "psn-api";

import express from 'express'

  async function main() {
    const myNpsso = "11vDYNELRMR4y3DuNF12y4fgiTespLitEZvWtL3lloYbvf9h48NOoVw19XjWU8P8";
  
    const accessCode = await exchangeNpssoForCode(myNpsso);
  
    const authorization = await exchangeCodeForAccessToken(accessCode);
  
    // This returns a list of all the games you've earned trophies for.
    const response = await getTitleTrophies(authorization, "NPWR17396_00", "all", {
      npServiceName: "trophy"
    });

    const responseps5 = await getTitleTrophies(authorization, "NPWR20684_00", "all");
    
    const trophyTitlesResponse = await getUserTitles(
        { accessToken: authorization.accessToken },
        "me"
    );

    const allAccountsSearchResults = await makeUniversalSearch(
        authorization,
        "june2k11",
        "SocialAllAccounts"
      );
    
    const targetAccountId =
    allAccountsSearchResults.domainResponses[0].results[0].socialMetadata
        .accountId;

    // 3. Get the user's list of titles (games).
    const { trophyTitles } = await getUserTitles(authorization, targetAccountId);

    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
        res.send(response)
    })

    app.get('/ps5', (req, res) => {
      res.send(responseps5)
  })

    app.get('/mine', (req, res) => {
        res.send(trophyTitlesResponse)
    })

    app.get('/june', async (req, res) => {
        let game = req.query.game;
        console.log(game)
        const responseps5 = await getTitleTrophies(authorization, "NPWR20684_00", "all");
        res.send(trophyTitles)
    })

    app.get('/game', async (req, res) => {
      let game = req.query.game;
      console.log(game)
      const responseps5 = await getTitleTrophies(authorization, game, "all");
      res.send(responseps5)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    // console.log(response)
  }
  
  main()


