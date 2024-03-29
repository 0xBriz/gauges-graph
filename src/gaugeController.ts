import {
  AddType,
  NewGauge,
  VoteForGauge,
} from './types/GaugeController/GaugeController';
import { Gauge, LiquidityGauge, Pool } from './types/schema';
import { getGaugeVote, getGaugeId, getGaugeType } from './utils/gauge';
import { scaleDownBPT } from './utils/maths';

export function handleVoteForGauge(event: VoteForGauge): void {
  let userAddress = event.params.user;
  let gaugeAddress = event.params.gauge_addr;

  let gaugeVote = getGaugeVote(userAddress, gaugeAddress);
  gaugeVote.weight = scaleDownBPT(event.params.weight);
  gaugeVote.timestamp = event.params.time;
  gaugeVote.save();
}

export function handleAddType(event: AddType): void {
  let type = getGaugeType(event.params.type_id);
  type.save();
}

export function handleNewGauge(event: NewGauge): void {
  let gaugeId = getGaugeId(event.params.addr, event.params.gauge_type);
  let gauge = Gauge.load(gaugeId);
  let liquidityGauge = LiquidityGauge.load(event.params.addr.toHexString());
  let type = getGaugeType(event.params.gauge_type);

  if (gauge == null) {
    gauge = new Gauge(gaugeId);
    gauge.address = event.params.addr;
    gauge.type = type.id;
    gauge.addedTimestamp = event.block.timestamp.toI32();
    gauge.liquidityGauge = liquidityGauge ? liquidityGauge.id : null;
  }

  gauge.save();

  // If LiquidityGauge, update Pool's prefentialGauge

  if (liquidityGauge != null) {
    liquidityGauge.gauge = gaugeId;
    liquidityGauge.save();

    let poolId = liquidityGauge.pool;
    if (poolId === null) return;

    let pool = Pool.load(poolId);
    if (pool == null) return;

    liquidityGauge.isPreferentialGauge = true;
    liquidityGauge.save();

    let currentPreferentialGaugeId = pool.preferentialGauge;

    pool.preferentialGauge = liquidityGauge.id;
    pool.save();

    if (currentPreferentialGaugeId === null) return;
    let currentPreferentialGauge = LiquidityGauge.load(
      currentPreferentialGaugeId,
    ) as LiquidityGauge;
    currentPreferentialGauge.isPreferentialGauge = false;
    currentPreferentialGauge.save();
  }
}
