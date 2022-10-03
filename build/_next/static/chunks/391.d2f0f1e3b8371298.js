"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[391],{87391:function(t,r,a){a.r(r),a.d(r,{NFTDrop:function(){return c}});var e=a(46150),n=a(11108),i=a(2593),s=a(9279),o=a(29251);a(25025),a(70332),a(8455),a(54098),a(26729),a(62555),a(26219),a(61303),a(49242),a(70565),a(13670),a(79120),a(97604),a(8187),a(19362),a(54730),a(36250),a(85725),a(38730),a(237),a(65609),a(77208),a(86841),a(49561),a(40553),a(26),a(69392),a(82037),a(64063),a(34161),a(50266),a(98839),a(51375),a(43320),a(90328),a(65815),a(59189),a(40721),a(46878),a(20583),a(84194),a(51121),a(32484),a(78435);class c extends n.aF{constructor(t,r,a){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0;super(arguments.length>5&&void 0!==arguments[5]?arguments[5]:new n.cm(t,r,s,i),a),(0,e._)(this,"abi",void 0),(0,e._)(this,"encoder",void 0),(0,e._)(this,"estimator",void 0),(0,e._)(this,"metadata",void 0),(0,e._)(this,"sales",void 0),(0,e._)(this,"platformFees",void 0),(0,e._)(this,"events",void 0),(0,e._)(this,"roles",void 0),(0,e._)(this,"interceptor",void 0),(0,e._)(this,"royalties",void 0),(0,e._)(this,"claimConditions",void 0),(0,e._)(this,"revealer",void 0),(0,e._)(this,"checkout",void 0),(0,e._)(this,"erc721",void 0),this.abi=s,this.metadata=new n.ah(this.contractWrapper,n.cx,this.storage),this.roles=new n.ai(this.contractWrapper,c.contractRoles),this.royalties=new n.aj(this.contractWrapper,this.metadata),this.sales=new n.ak(this.contractWrapper),this.claimConditions=new n.am(this.contractWrapper,this.metadata,this.storage),this.encoder=new n.ag(this.contractWrapper),this.estimator=new n.aR(this.contractWrapper),this.events=new n.aS(this.contractWrapper),this.platformFees=new n.aU(this.contractWrapper),this.erc721=new n.aw(this.contractWrapper,this.storage),this.revealer=new n.al(this.contractWrapper,this.storage,n.cy.name,(()=>this.erc721.nextTokenIdToMint())),this.interceptor=new n.aT(this.contractWrapper),this.checkout=new n.cl(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async totalSupply(){const t=await this.totalClaimedSupply(),r=await this.totalUnclaimedSupply();return t.add(r)}async getAllClaimed(t){const r=i.O$.from((null===t||void 0===t?void 0:t.start)||0).toNumber(),a=i.O$.from((null===t||void 0===t?void 0:t.count)||n.aZ).toNumber(),e=Math.min((await this.contractWrapper.readContract.nextTokenIdToClaim()).toNumber(),r+a);return await Promise.all(Array.from(Array(e).keys()).map((t=>this.get(t.toString()))))}async getAllUnclaimed(t){const r=i.O$.from((null===t||void 0===t?void 0:t.start)||0).toNumber(),a=i.O$.from((null===t||void 0===t?void 0:t.count)||n.aZ).toNumber(),e=i.O$.from(Math.max((await this.contractWrapper.readContract.nextTokenIdToClaim()).toNumber(),r)),s=i.O$.from(Math.min((await this.contractWrapper.readContract.nextTokenIdToMint()).toNumber(),e.toNumber()+a));return await Promise.all(Array.from(Array(s.sub(e).toNumber()).keys()).map((t=>this.erc721.getTokenMetadata(e.add(t).toString()))))}async totalClaimedSupply(){return await this.contractWrapper.readContract.nextTokenIdToClaim()}async totalUnclaimedSupply(){return(await this.contractWrapper.readContract.nextTokenIdToMint()).sub(await this.totalClaimedSupply())}async isTransferRestricted(){return!(await this.contractWrapper.readContract.hasRole((0,n.bs)("transfer"),s.d))}async createBatch(t,r){const a=await this.contractWrapper.readContract.nextTokenIdToMint(),e=await(0,n.cz)(t,this.storage,a.toNumber(),r),i=e[0].substring(0,e[0].lastIndexOf("/"));for(let n=0;n<e.length;n++){const t=e[n].substring(0,e[n].lastIndexOf("/"));if(i!==t)throw new Error(`Can only create batches with the same base URI for every entry in the batch. Expected '${i}' but got '${t}'`)}const s=await this.contractWrapper.sendTransaction("lazyMint",[e.length,i.endsWith("/")?i:`${i}/`,o.Y0("")]),c=this.contractWrapper.parseLogs("TokensLazyMinted",null===s||void 0===s?void 0:s.logs),h=c[0].args.startTokenId,l=c[0].args.endTokenId,p=[];for(let n=h;n.lte(l);n=n.add(1))p.push({id:n,receipt:s,data:()=>this.erc721.getTokenMetadata(n)});return p}async getClaimTransaction(t,r){let a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.erc721.getClaimTransaction(t,r,{checkERC20Allowance:a})}async claimTo(t,r){let a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.erc721.claimTo(t,r,{checkERC20Allowance:a})}async claim(t){let r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return this.claimTo(await this.contractWrapper.getSignerAddress(),t,r)}async burn(t){return this.erc721.burn(t)}async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}async transfer(t,r){return this.erc721.transfer(t,r)}async setApprovalForAll(t,r){return this.erc721.setApprovalForAll(t,r)}async setApprovalForToken(t,r){return{receipt:await this.contractWrapper.sendTransaction("approve",[t,r])}}async prepareClaim(t,r){return(0,n.cA)(t,await this.claimConditions.getActive(),(async()=>(await this.metadata.get()).merkle),0,this.contractWrapper,this.storage,r)}async call(t){for(var r=arguments.length,a=new Array(r>1?r-1:0),e=1;e<r;e++)a[e-1]=arguments[e];return this.contractWrapper.call(t,...a)}}(0,e._)(c,"contractRoles",["admin","minter","transfer"])}}]);