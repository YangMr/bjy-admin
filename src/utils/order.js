const order = {
  status: {
    // 虚拟物品，无拼团
    virtual_0: [
      { condition: { order_status: 1, pay_status: 1 }, descID: 1 },
      { condition: { order_status: 2, pay_status: 2 }, descID: 5 },
      {
        condition: [
          { order_status: 1, pay_status: 3 },
          { order_status: 2, pay_status: 3 },
        ],
        descID: 7,
      },
      {
        condition: [
          { order_status: 1, pay_status: 4 },
          { order_status: 2, pay_status: 4 },
        ],
        descID: 8,
      },
      {
        condition: [
          { order_status: 1, pay_status: 6 },
          { order_status: 2, pay_status: 6 },
        ],
        descID: 9,
      },
      { condition: { order_status: 3, pay_status: 1 }, descID: 12 },
      { condition: { order_status: 3, pay_status: 5 }, descID: 10 },
    ],
    // 实物物品，无拼团
    entity_0: [
      { condition: { order_status: 1, pay_status: 1 }, descID: 1 },
      {
        condition: { order_status: 1, pay_status: 2, ship_status: 1 },
        descID: 3,
      },
      {
        condition: { order_status: 1, pay_status: 2, ship_status: 3 },
        descID: 4,
      },
      {
        condition: { order_status: 2, pay_status: 2, ship_status: 4 },
        descID: 5,
      },
      {
        condition: [
          { order_status: 1, pay_status: 3 },
          { order_status: 2, pay_status: 3 },
        ],
        descID: 7,
      },
      {
        condition: [
          { order_status: 1, pay_status: 4 },
          { order_status: 2, pay_status: 4 },
        ],
        descID: 8,
      },
      {
        condition: [
          { order_status: 1, pay_status: 6 },
          { order_status: 2, pay_status: 6 },
        ],
        descID: 9,
      },
      { condition: { order_status: 3, pay_status: 1 }, descID: 12 },
      { condition: { order_status: 3, pay_status: 5 }, descID: 10 },
    ],
    // 虚拟物品，有拼团
    virtual_1: [
      { condition: { order_status: 1, pay_status: 1 }, descID: 1 },
      {
        condition: { order_status: 1, pay_status: 2, group_status: 2 },
        descID: 2,
      },
      {
        condition: { order_status: 2, pay_status: 2, group_status: 1 },
        descID: 6,
      },
      {
        condition: [
          { order_status: 1, pay_status: 3 },
          { order_status: 2, pay_status: 3 },
        ],
        descID: 7,
      },
      {
        condition: [
          { order_status: 1, pay_status: 4 },
          { order_status: 2, pay_status: 4 },
        ],
        descID: 8,
      },
      {
        condition: [
          { order_status: 1, pay_status: 6 },
          { order_status: 2, pay_status: 6 },
        ],
        descID: 9,
      },
      {
        condition: [
          { order_status: 3, pay_status: 5, group_status: 1 },
          { order_status: 3, pay_status: 5, group_status: null },
        ],
        descID: 10,
      },
      {
        condition: [
          { order_status: 3, pay_status: 2, group_status: 3 },
          { order_status: 3, pay_status: 5, group_status: 3 },
        ],
        descID: 11,
      },
      { condition: { order_status: 3, pay_status: 1 }, descID: 12 },
    ],
    // 实物物品，有拼团
    entity_1: [
      { condition: { order_status: 1, pay_status: 1 }, descID: 1 },
      {
        condition: { order_status: 1, pay_status: 2, group_status: 2 },
        descID: 2,
      },
      {
        condition: {
          order_status: 1,
          pay_status: 2,
          ship_status: 1,
          group_status: 1,
        },
        descID: 13,
      },
      {
        condition: {
          order_status: 1,
          pay_status: 2,
          ship_status: 3,
          group_status: 1,
        },
        descID: 4,
      },
      {
        condition: {
          order_status: 2,
          pay_status: 2,
          ship_status: 4,
          group_status: 1,
        },
        descID: 6,
      },
      {
        condition: [
          { order_status: 1, pay_status: 3 },
          { order_status: 2, pay_status: 3 },
        ],
        descID: 7,
      },
      {
        condition: [
          { order_status: 1, pay_status: 4 },
          { order_status: 2, pay_status: 4 },
        ],
        descID: 8,
      },
      {
        condition: [
          { order_status: 1, pay_status: 6 },
          { order_status: 2, pay_status: 6 },
        ],
        descID: 9,
      },
      {
        condition: [
          { order_status: 3, pay_status: 5, group_status: 1 },
          { order_status: 3, pay_status: 5, group_status: null },
        ],
        descID: 10,
      },
      {
        condition: [
          { order_status: 3, pay_status: 2, group_status: 3 },
          { order_status: 3, pay_status: 5, group_status: 3 },
        ],
        descID: 11,
      },
      { condition: { order_status: 3, pay_status: 1 }, descID: 12 },
    ],
  },
  desc: {
    1: {
      detail: "待支付",
    },
    2: {
      detail: "拼团中",
    },
    3: {
      detail: "待发货",
    },
    4: {
      detail: "已发货",
    },
    5: {
      detail: "交易完成",
    },
    6: {
      detail: "交易完成",
      more: "已成团，交易完成",
    },
    7: {
      detail: "退款申请中",
    },
    8: {
      detail: "退款中",
    },
    9: {
      detail: "退款失败",
    },
    10: {
      detail: "交易关闭",
      more: "退款成功，交易关闭",
    },
    11: {
      detail: "交易关闭",
      more: "未成团，交易关闭",
    },
    12: {
      detail: "交易关闭",
      more: "超时未支付，交易关闭",
    },
    13: {
      detail: "待发货",
      more: "已成团，待发货",
    },
  },
};

// 检测条件
function checkCondition(data, condition) {
  let flag = true;
  for (const key in condition) {
    if (data[key] != condition[key]) {
      flag = false;
      break;
    }
  }
  return flag;
}

// 获取描述
function getDesc(data, dict) {
  for (const i of dict) {
    let flag = false;
    if (i.condition.length) {
      for (const item of i.condition) {
        if (checkCondition(data, item)) {
          flag = true;
          break;
        }
      }
    } else {
      flag = checkCondition(data, i.condition);
    }
    if (flag) {
      const textObj = order.desc[i.descID].copy
        ? Object.assign({}, order.desc[i.descID])
        : order.desc[i.descID];
      return { id: i.descID, text: textObj };
    }
  }
  return { id: 0, text: {} };
}

export default {
  // 获取描述数据
  getDescData(data) {
    let obj = {};
    if (!data.spell_id) {
      if (data.is_virtual == 1) obj = getDesc(data, order.status.virtual_0);
      else obj = getDesc(data, order.status.entity_0);
    } else if (data.is_virtual == 1) {
      obj = getDesc(data, order.status.virtual_1);
    } else {
      obj = getDesc(data, order.status.entity_1);
    }
    return obj;
  },
};
